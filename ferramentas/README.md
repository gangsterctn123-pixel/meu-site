# ferramentas/

Projetos completos do estúdio de vídeo. Cada subpasta é um clone git do mantenedor e
**não é versionada** neste repositório (ver `.gitignore`). Para recriá-las:

```bash
bash estudio/instalar-estudio.sh
```

| Pasta | Iniciar o Claude daqui | Primeiro comando |
|---|---|---|
| `herk-edit-kit/` | `cd ferramentas/herk-edit-kit && claude` | `/edit-video` |
| `claude-code-video-toolkit/` | `cd ferramentas/claude-code-video-toolkit && claude` | `/setup`, depois `/video` |
| `OpenMontage/` | `cd ferramentas/OpenMontage && claude` | descreva o vídeo |
| `OpenChatCut/` | app local (Node 24): `npm run dev` | use pela skill `/openchatcut` na raiz |

Detalhes e pendências: `ESTUDIO.md` na raiz.
