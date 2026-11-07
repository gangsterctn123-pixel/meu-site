#!/usr/bin/env bash
# Reinstala o estúdio de vídeo deste repositório (Linux e macOS).
# Uso, a partir da raiz do repositório:   bash estudio/instalar-estudio.sh
# Idempotente: o que já estiver instalado é mantido/atualizado.
# Não pede nem grava chaves de API: veja ESTUDIO.md, seção "Configuração pendente".
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
SK=".claude/skills"
FALHAS=()

passo() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
falha() { printf '  [pendente] %s\n' "$*"; FALHAS+=("$*"); }

passo "Pré-requisitos"
for c in claude git node npm npx python3 uv ffmpeg ffprobe; do
  command -v "$c" >/dev/null || falha "falta o comando '$c' (veja ESTUDIO.md)"
done

# --- 1. Plugins com marketplace (escopo local deste projeto) -------------------
plugin() { # <marketplace> <fonte> <plugin>
  claude plugin marketplace add "$2" --scope local >/dev/null 2>&1 || true
  claude plugin install "$3@$1" --scope local || falha "plugin $3@$1"
}
passo "Plugins (claude plugin install --scope local)"
plugin ffmpeg-skill            kajisho5/ffmpeg-skill                ffmpeg-skill
plugin hyperframes             heygen-com/hyperframes               hyperframes
plugin youtube-agent-skill     Jakeschincariol/youtube-agent-skill  youtube-agent
plugin claude-video-vision     jordanrendric/claude-video-vision    claude-video-vision
plugin omni-captions-skills    lattifai/omni-captions-skills        omnicaptions
plugin visual-skills           smixs/visual-skills                  visual-skills
plugin claude-plugins-official anthropics/claude-plugins-official   superpowers
plugin claude-plugins-official anthropics/claude-plugins-official   skill-creator

# --- 2. Skills pelo CLI oficial "skills" (vão para .claude/skills/) -----------
export CI=1
skills_add() { npx -y skills@latest add "$@" -a claude-code -y --copy >/dev/null || falha "skills add $1"; }
passo "Skills via npx skills (escopo do projeto)"
skills_add remotion-dev/skills --skill '*'
skills_add Vincentwei1021/video-shotcraft --skill '*'
skills_add charlie947/motion-graphics-skills --skill '*'
skills_add elevenlabs/skills --skill agents dubbing music onboarding realtime setup-api-key \
  sound-effects speech-engine speech-to-text text-to-speech voice-changer voice-isolator
skills_add 0xsline/OpenChatCut --skill openchatcut
skills_add https://github.com/pexoai/pexo-skills --skill pexo-agent

passo "Motion Skills (índice iart-ai/motion-skills, 19 pacotes)"
# Colisões de nome resolvidas: launch-video fica com o pacote Motion Graphics (item 11);
# lower-thirds fica com o pacote dedicado lower-thirds-skills.
skills_add iart-ai/tiktok-video-skills --skill countdown-video caption-animation short-form-video
skills_add iart-ai/ad-video-skills --skill testimonial-video ad-creative-video
skills_add iart-ai/ecommerce-video-skills --skill promo-video photo-slideshow
for p in text-message-video youtube-video data-animation explainer-video map-animation web-animation \
         motion-design kinetic-typography freelance-motion webgl-animation manim generative-illustration \
         javascript-animation lower-thirds b-roll talking-head; do
  skills_add "iart-ai/$p-skills" --skill '*'
done

# --- 3. Skills instaladas como pasta completa ---------------------------------
clone_skill() { # <repo> <pasta>
  [ -f "$SK/$2/SKILL.md" ] || git clone -q --depth 1 "https://github.com/$1" "$SK/$2" || falha "clone $1"
}
passo "Skills por pasta (git clone em .claude/skills/)"
clone_skill browser-use/video-use        video-use
clone_skill louisedesadeleer/clipify     clipify
clone_skill Newuxtreme/watch-video-skill watch-video
clone_skill isaacrowntree/color-grade-ai color-grade
# claude-watch: o plugin.json do mantenedor é recusado pelo Claude Code atual; usa-se a pasta.
clone_skill devinilabs/claude-watch      claude-watch

TMP="$(mktemp -d)"
# product-demo-video: frontmatter YAML inválido no original -> copia com descrição entre aspas.
if [ ! -f "$SK/product-demo-video/SKILL.md" ]; then
  git clone -q --depth 1 https://github.com/iart-ai/ecommerce-video-skills "$TMP/ecom" &&
    cp -R "$TMP/ecom/skills/product-demo-video" "$SK/" || falha "product-demo-video"
fi
# Claude Shorts: mesma seleção de arquivos do install.sh do mantenedor, com destino no projeto.
if [ ! -f "$SK/shorts/SKILL.md" ]; then
  git clone -q --depth 1 https://github.com/AgriciDaniel/claude-shorts "$TMP/shorts" && {
    mkdir -p "$SK/shorts/scripts" "$SK/shorts/references" "$SK/shorts/remotion"
    cp "$TMP/shorts/SKILL.md" "$TMP/shorts/requirements.txt" "$TMP/shorts/setup.sh" "$SK/shorts/"
    cp "$TMP"/shorts/scripts/*.sh "$TMP"/shorts/scripts/*.py "$SK/shorts/scripts/" 2>/dev/null
    chmod +x "$SK"/shorts/scripts/* 2>/dev/null
    cp "$TMP"/shorts/references/*.md "$SK/shorts/references/"
    (cd "$TMP/shorts/remotion" && tar --exclude=node_modules --exclude=.remotion -cf - .) | (cd "$SK/shorts/remotion" && tar -xf -)
  } || falha "claude-shorts"
fi
rm -rf "$TMP"

passo "Correções mínimas de compatibilidade (idempotentes)"
python3 - "$SK" <<'PY'
import sys, pathlib
sk = pathlib.Path(sys.argv[1])
def edit(rel, fn):
    p = sk / rel
    if p.exists():
        t = p.read_text(); n = fn(t)
        if n != t: p.write_text(n); print("  ajustado:", rel)
def quote_desc(t):
    out = []
    for l in t.split("\n"):
        if l.startswith("description: ") and not l.startswith("description: '"):
            l = "description: '" + l[13:].replace("'", "''") + "'"
        out.append(l)
    return "\n".join(out)
edit("product-demo-video/SKILL.md", quote_desc)
edit("color-grade/SKILL.md", lambda t: t.replace(
    "argument-hint: [lut-type] [output-path]\n", "argument-hint: '[lut-type] [output-path]'\n", 1))
edit("shorts/SKILL.md", lambda t: t if '"$(pwd)/.claude/skills/shorts"' in t else t.replace(
    'for dir in "$HOME/.claude/skills/shorts"', 'for dir in "$(pwd)/.claude/skills/shorts" "$HOME/.claude/skills/shorts"', 1))
PY

# --- 4. Dependências das skills ------------------------------------------------
passo "Dependências (yt-dlp, Whisper, OmniCaptions CLI, venvs)"
uv tool install yt-dlp            || falha "yt-dlp"
uv tool install openai-whisper    || falha "openai-whisper (Clipify)"
uv tool install omni-captions-skills --extra-index-url https://lattifai.github.io/pypi/simple/ \
  || uv tool install omni-captions-skills || falha "omni-captions-skills"
(cd "$SK/video-use" && uv sync -q)  || falha "video-use: uv sync"
# Shorts: passos do setup.sh do mantenedor; PyTorch é opcional (faster-whisper roda em CPU sem ele).
VENV="$HOME/.shorts-skill"; [ -d "$HOME/.video-skill" ] && VENV="$HOME/.video-skill"
[ -x "$VENV/bin/python3" ] || uv venv -q "$VENV" --python 3.12
VIRTUAL_ENV="$VENV" uv pip install -q faster-whisper mediapipe numpy opencv-python || falha "shorts: venv Python"
(cd "$SK/shorts/remotion" && npm install --no-audit --no-fund --silent) || falha "shorts: npm install"
python3 -c "import PIL, numpy, yaml" 2>/dev/null || python3 -m pip install --user Pillow numpy PyYAML || falha "color-grade: Pillow numpy PyYAML"

# --- 5. Projetos completos em ferramentas/ -------------------------------------
passo "Projetos completos em ferramentas/"
mkdir -p ferramentas
clone_tool() { [ -d "ferramentas/$2/.git" ] || git clone -q --depth 1 "https://github.com/$1" "ferramentas/$2" || falha "clone $1"; }
clone_tool nateherkai/herk-edit-kit             herk-edit-kit
clone_tool digitalsamba/claude-code-video-toolkit claude-code-video-toolkit
clone_tool calesthio/OpenMontage                OpenMontage
clone_tool 0xsline/OpenChatCut                  OpenChatCut

(cd ferramentas/herk-edit-kit && npm ci --no-audit --no-fund --silent && npm run -s setup && npm test --silent >/dev/null) \
  || falha "herk-edit-kit: npm ci / setup / test"
(cd ferramentas/claude-code-video-toolkit && uv sync -q) || falha "video-toolkit: uv sync"
(cd ferramentas/OpenMontage && { [ -x .venv/bin/python ] || uv venv -q --seed --python 3.10 .venv; } && make setup >/dev/null) \
  || falha "OpenMontage: make setup"

# OpenChatCut exige Node 24.x (.nvmrc). Usa o nvm, se existir, sem mudar o Node padrão.
NODE24=""
for d in "${NVM_DIR:-}" "$HOME/.nvm" /opt/nvm /usr/local/nvm "$(command -v brew >/dev/null && brew --prefix nvm 2>/dev/null)"; do
  if [ -n "$d" ] && [ -s "$d/nvm.sh" ]; then
    export NVM_DIR="$d"; . "$d/nvm.sh"
    had_default=0; [ -e "$NVM_DIR/alias/default" ] && had_default=1
    nvm install 24 >/dev/null && NODE24="$(dirname "$(nvm which 24)")"
    # o primeiro "nvm install" cria o alias default; desfaz para não trocar o Node padrão
    [ "$had_default" = 0 ] && nvm unalias default >/dev/null 2>&1
    break
  fi
done
if [ -n "$NODE24" ] || node -v | grep -q '^v24\.'; then
  ( cd ferramentas/OpenChatCut
    [ -n "$NODE24" ] && export PATH="$NODE24:$PATH"
    # O lockfile aponta alguns pacotes para registry.npmmirror.com; usa o registro oficial (mesmos hashes).
    npm install --no-audit --no-fund --replace-registry-host=registry.npmmirror.com --registry=https://registry.npmjs.org/ &&
    npm install-scripts approve @ffprobe-installer/linux-x64 onnxruntime-node esbuild ffmpeg-static koffi protobufjs >/dev/null 2>&1;
    npm rebuild >/dev/null 2>&1; git checkout -q package-lock.json 2>/dev/null
    [ -f .env.local ] || cp .env.example .env.local ) || falha "OpenChatCut: npm install"
else
  falha "OpenChatCut precisa de Node 24.x (instale com nvm: nvm install 24)"
fi

passo "Resumo"
claude plugin list 2>/dev/null | grep -E '^\s*>' || true
echo "  skills de projeto: $(ls -d $SK/*/ 2>/dev/null | wc -l | tr -d ' ')"
if [ ${#FALHAS[@]} -eq 0 ]; then echo "  Tudo instalado."; else printf '  Pendências:\n'; printf '   - %s\n' "${FALHAS[@]}"; fi
echo "  Reinicie o Claude Code nesta pasta para carregar plugins e skills."
