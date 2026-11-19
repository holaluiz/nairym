# Nairym Sosa — Apresentação de marca

Apresentação cinematográfica e brand book interativo da identidade visual de **Nairym Sosa · Máster Nail Artist** (conteúdo em espanhol latino-americano). Status: proposta para aprovação.

## Abrir

Os vídeos e imagens precisam ser servidos por HTTP (abrir o `index.html` direto do disco não carrega a mídia):

```bash
node serve.mjs        # http://localhost:5190
```

Também funciona em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel), porque todos os caminhos são relativos.

## O que tem

1. **Abertura**: o isotipo voa e vira "Nairym Sosa" a partir de ícones em pixel; leque de trabalhos.
2. **Essência**: cards que se espalham, empilham e giram numa roda.
3. **Três pilares**: Naturalidad, Tecnología e Fluidez sobre os filmes de marca; o isotipo mergulha na gota.
4. **Manifesto**: o conceito corre na horizontal com fotos, cores e a proporção 60/30/10.
5. **Brand book** (rolagem normal, com barra de capítulos):
   - Logotipo: versões horizontal, vertical, isotipo, nome e avatar em 5 cores, com teste de fundo, aviso de contraste e download SVG / PNG 1x·2x·4x; usos incorretos.
   - Color: paleta com HEX, RGB e CMYK (clique copia o HEX).
   - Tipografía: Cormorant Garamond, Manrope e Sora, probador ao vivo e hierarquia.
   - Fotografía: direção de arte e galeria com filtros e lightbox.
   - Aplicaciones: 7 mockups e elementos gráficos.
   - Redes: perfil de Instagram com feed, gerador de posts (5 plantillas, exporta PNG) e reels.
   - Descargas: brand kit completo e ZIPs por categoria.
6. **Firma**: fechamento com o logo.

## Estrutura

```
index.html      motor de scroll (hero, cards, pilares, manifesto) + marcação do brand book
brandbook.css   estilos do brand book
brandbook.js    laboratório de logo, cores, tipografia, galeria, mockups, gerador de posts
serve.mjs       servidor estático local (com suporte a Range para vídeo)
assets/photos   fotografias (trabalhos, atmosfera, Nairym e aulas)
assets/film     filmes de marca e pôsteres
assets/brand    logos usados na apresentação
assets/kit      brand kit para download (logos, cores, mockups, elementos, motion, guias, ZIPs)
```

Os arquivos de `assets/kit` vêm do projeto `nairym-brand-experience`, onde ficam os scripts que os geram.
