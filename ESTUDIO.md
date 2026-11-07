# Estúdio de produção de vídeo

Esta pasta também funciona como estúdio de vídeo para o Claude Code: 8 plugins (escopo
local), 103 skills de projeto em `.claude/skills/` e 4 projetos completos em `ferramentas/`.
O site em `src/` continua igual.

## Recriar a instalação em outra máquina ou numa sessão nova

```bash
bash estudio/instalar-estudio.sh
```

O script segue o método de cada mantenedor, pode ser rodado de novo sem problema e lista as
pendências no fim. Ele **não** pede nem grava chaves de API.

O que fica no git e o que não fica:

- **No git:** as skills leves de `.claude/skills/` (cerca de 9 MB), `skills-lock.json`, o script e o projeto de teste.
- **Fora do git:**
  - `ferramentas/*`: são clones dos mantenedores, com cerca de 5 GB somando as dependências;
  - `.claude/skills/color-grade` (35 MB) e `.claude/skills/video-shotcraft` (65 MB);
  - venvs e `node_modules`;
  - `.claude/settings.local.json`, onde ficam os plugins de escopo local.

O script recria tudo isso.

## Ambiente em que foi instalado

| Item | Versão |
|---|---|
| Sistema | Ubuntu 24.04.5 LTS (x86_64) |
| Claude Code | 2.1.319 |
| Git | 2.43.0 |
| Node / npm | 22.23.4 / 10.9.9 (o padrão). O Node 24.22.x via nvm é usado só pelo OpenChatCut |
| Python | 3.13.18. O uv 0.11.32 cria as venvs (3.12 para o Shorts, 3.10 para o OpenMontage) |
| FFmpeg / ffprobe | 6.1.1 (com libx264, drawtext, subtitles, libvpx e prores) |
| Instalados para o estúdio | yt-dlp 2026.10.26, openai-whisper, CLI `omnicaptions` (via `uv tool`) |

## Teste de render

`estudio/teste-render/` é uma composição HyperFrames sintética (sem mídia externa e com GSAP local).
O resultado é `renders/teste-5s.mp4`, que o ffprobe valida assim: H.264, 1920×1080, yuv420p,
30 fps, 150 quadros, **5,000 s**.

```bash
cd estudio/teste-render
npx hyperframes@0.9.20 render --output renders/teste-5s.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,nb_frames renders/teste-5s.mp4
```

## Os 24 itens

Legenda de status: **Instalado**: os arquivos estão no lugar e registrados. **Testado**: um
comando real rodou com sucesso nesta instalação. **Config.**: a ferramenta depende de chave,
login ou download que você precisa fazer.

| # | Item | Fonte | Tipo | Status | Como usar | Configuração pendente |
|---|---|---|---|---|---|---|
| 1 | Video Use | browser-use/video-use | Skill (pasta completa) + venv uv | Instalado · Testado (`timeline_view.py` num vídeo sintético) · Config. | Abra o Claude na pasta das gravações e peça "edite estes vídeos num vídeo de lançamento" | `ELEVENLABS_API_KEY` em `.claude/skills/video-use/.env` ou no ambiente |
| 2 | Herk Edit Kit | nateherkai/herk-edit-kit | Projeto completo · `ferramentas/herk-edit-kit` | Instalado · Testado (`npm test` 11/11) · Config. | `cd ferramentas/herk-edit-kit && claude`, depois `/edit-video`, `/short-form-edit` ou `/cut-silences` | Chaves no `.env` da pasta: ElevenLabs para transcrição, Kie.ai opcional |
| 3 | FFmpeg Skill | kajisho5/ffmpeg-skill | Plugin `ffmpeg-skill@ffmpeg-skill` | Instalado · Testado (`doctor`: 84 capacidades, nenhuma obrigatória faltando) | `/ffmpeg-skill:ffmpeg-skill` | Nenhuma. Sugestão de segurança: `sudo apt update && sudo apt install --only-upgrade ffmpeg` |
| 4 | OpenChatCut | 0xsline/OpenChatCut | Skill `openchatcut` + app em `ferramentas/OpenChatCut` + MCP | Instalado · Testado (o servidor sobe e o MCP responde 401, à espera do token) · Config. | Inicie o app (veja abaixo) e use `/openchatcut` a partir da raiz | Token MCP gerado pelo app (veja abaixo). Chaves de IA no `.env.local` |
| 5 | HyperFrames | heygen-com/hyperframes | Plugin `hyperframes@hyperframes` 0.9.20 | Instalado · Testado (o MP4 de 5 s) | `/hyperframes:hyperframes`, `npx hyperframes init` / `render` | Nenhuma. Opcionais: whisper-cpp, Kokoro |
| 6 | Remotion Skills | remotion-dev/skills | 13 skills (`npx skills`) | Instalado | `/remotion-best-practices`, `/remotion-create` | Nenhuma. Empresas: veja `/remotion-license` |
| 7 | Video Shotcraft | Vincentwei1021/video-shotcraft | Skill (`npx skills`) | Instalado | `/video-shotcraft` | Nenhuma obrigatória. Publicação: `UPLOAD_POST_API_KEY` |
| 8 | Motion Skills | iart-ai/motion-skills (índice) → 19 pacotes | 54 skills (`npx skills`, um pacote por vez) | Instalado | Por exemplo `/kinetic-typography`, `/chart-animation`, `/lower-thirds`, `/manim` | `talking-head` usa ElevenLabs e FAL (`ELEVENLABS_API_KEY`, `FAL_API_KEY`) |
| 9 | Clipify | louisedesadeleer/clipify | Skill (pasta completa) | Instalado · Config. | `/clipify` | O modelo Whisper baixa no primeiro uso (o host foi bloqueado nesta nuvem) |
| 10 | Claude Shorts | AgriciDaniel/claude-shorts | Skill `.claude/skills/shorts` + venv `~/.shorts-skill` + Remotion | Instalado (imports verificados) · Config. | `/shorts` | O modelo faster-whisper baixa no primeiro uso. GPU (opcional): `VIRTUAL_ENV=~/.shorts-skill uv pip install torch --index-url https://download.pytorch.org/whl/cu128` |
| 11 | Motion Graphics | charlie947/motion-graphics-skills | 15 skills (`npx skills`) | Identidade confirmada (Motion Graphics Skill Pack, Charlie Hills, MIT) · Instalado | Comece com `/brand-intake`, depois `/launch-video`, `/animated-chart` etc. | Nenhuma (renderiza com HyperFrames) |
| 12 | YouTube Agent | Jakeschincariol/youtube-agent-skill | Plugin `youtube-agent@youtube-agent-skill` | Instalado | `/youtube-agent:yt-script`, `/youtube-agent:yt-shorts`, `/youtube-agent:yt-seo` | Nenhuma |
| 13 | Claude Video Vision | jordanrendric/claude-video-vision | Plugin + MCP (`npx claude-video-vision`) | Instalado · Testado (o MCP lista 6 ferramentas) · Config. | `/claude-video-vision:setup-video-vision`, depois "assista a este vídeo" | Escolha um backend de áudio: `GEMINI_API_KEY`, Whisper local ou `OPENAI_API_KEY` |
| 14 | Watch Video | Newuxtreme/watch-video-skill | Skill (pasta completa) | Instalado · Testado (`setup.py --check`) · Config. | `/watch-video` | `GROQ_API_KEY` ou `OPENAI_API_KEY` em `~/.config/watch/.env` (só para vídeos sem legenda) |
| 15 | Claude Watch | devinilabs/claude-watch | Skill (pasta). O plugin do mantenedor é recusado pelo Claude Code atual | Instalado · Testado (`setup.py --check`) · Config. | Peça "faça notas de estudo deste vídeo" (skill `claude-watch`) | `GROQ_API_KEY` ou `OPENAI_API_KEY` em `~/.config/claude-watch/.env`, ou use `--no-whisper` |
| 16 | Omni Captions | lattifai/omni-captions-skills (indicado no PyPI) | Plugin `omnicaptions@omni-captions-skills` + CLI | Instalado · Config. | `/omnicaptions:transcribe`, `/omnicaptions:translate`, `/omnicaptions:convert` | Gemini para transcrever (pedido no primeiro uso). LaiCut: `uv tool install "omni-captions-skills[laicut]" --force --extra-index-url https://lattifai.github.io/pypi/simple/` + chave LattifAI |
| 17 | Color Grade AI | isaacrowntree/color-grade-ai | Skill (pasta completa, fora do git) | Instalado · Testado (`auto_grade.py` gerou um `.cube`, aplicado com ffmpeg) | `/color-grade` | Nenhuma |
| 18 | ElevenLabs Skills | elevenlabs/skills | 12 skills (`npx skills`) | Instalado · Config. | `/text-to-speech`, `/speech-to-text`, `/dubbing`, `/sound-effects` | `ELEVENLABS_API_KEY` (rode `/setup-api-key`) |
| 19 | Pexo | pexoai/pexo-skills | Skill `pexo-agent` (`npx skills`) | Instalado · Testado (o doctor só acusa a config) · Config. | `/pexo-agent` | Crie `~/.pexo/config` com `PEXO_BASE_URL="https://pexo.ai"` e `PEXO_API_KEY="sk-..."`. Teste com `bash .claude/skills/pexo-agent/scripts/pexo-doctor.sh` |
| 20 | Visual Skills | smixs/visual-skills | Plugin `visual-skills@visual-skills` | Instalado | `/visual-skills:video`, `/visual-skills:image` | Nenhuma |
| 21 | Video Toolkit | digitalsamba/claude-code-video-toolkit | Projeto completo · `ferramentas/claude-code-video-toolkit` | Instalado (`uv sync`) · Config. | `cd ferramentas/claude-code-video-toolkit && claude`, depois `/setup` e `/video` | O `/setup` configura a GPU na nuvem (Modal/RunPod), o R2 e a voz |
| 22 | OpenMontage | calesthio/OpenMontage | Projeto completo · `ferramentas/OpenMontage` | Instalado (`make setup`: Python, Remotion, Piper TTS, runtime HyperFrames) | `cd ferramentas/OpenMontage && claude` e descreva o vídeo | Opcional: chaves no `.env` (Pexels, provedores na nuvem) |
| 23 | Superpowers | obra/superpowers | Plugin `superpowers@claude-plugins-official` 7.0.0 | Instalado | Carrega sozinho ao iniciar. Por exemplo `/superpowers:brainstorming` | Nenhuma |
| 24 | Skill Creator | claude.com/plugins/skill-creator | Plugin `skill-creator@claude-plugins-official` | Instalado | `/skill-creator:skill-creator` | Nenhuma |

### OpenChatCut: iniciar o app e registrar o MCP

```bash
cd ferramentas/OpenChatCut
nvm use 24
npm run dev
```

No app (http://localhost:5199), abra **Settings → MCP**, copie o token e, **a partir da raiz
deste repositório**, rode:

```bash
claude mcp add --scope local --transport http -H "Authorization: Bearer SEU_TOKEN" openchatcut http://localhost:5199/api/external-mcp/mcp
```

## Ajustes feitos nos arquivos dos mantenedores

O script reaplica estes ajustes:

- `product-demo-video` (iart-ai/ecommerce-video-skills): a `description` tinha `: ` sem aspas,
  o que torna o YAML inválido e faz o CLI `skills` recusar a skill. O texto foi posto entre aspas.
- `color-grade`: o `argument-hint: [lut-type] [output-path]` também era YAML inválido e foi posto entre aspas.
- `shorts`: o SKILL.md só procura em `~/.claude/skills/shorts`. O caminho `$(pwd)/.claude/skills/shorts`
  foi incluído na busca.
- Colisões de nome: `launch-video` ficou com o Motion Graphics (item 11), e o `launch-video`
  do iart-ai/ad-video-skills não foi instalado. Havia dois `lower-thirds`; ficou o do pacote dedicado `lower-thirds-skills`.
- OpenChatCut: o lockfile aponta 3 pacotes para `registry.npmmirror.com`. A instalação usou o
  registro oficial do npm, com os mesmos hashes de integridade.

## Depois de instalar ou atualizar

Reinicie o Claude Code nesta pasta para carregar plugins, skills e hooks:

```bash
claude
```

Se ele já estiver aberto, saia com `/exit` e rode `claude` de novo na raiz do repositório.
