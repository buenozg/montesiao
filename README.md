# Monte Sião

Base institucional estática em Astro para a Monte Sião, estruturada para evolução real do projeto com Tailwind CSS, componentização reutilizável e conteúdo orientado por collection.

## Stack

- Astro 6 com saída estática
- Tailwind CSS v4 via `@tailwindcss/vite`
- Content Collections com loader `glob`
- Componentes Astro desacoplados em `ui`, `layout` e `sections`

## Estrutura

```text
/
├── public/
│   ├── images/solutions/
│   └── og-default.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── seo/
│   │   └── ui/
│   ├── content/
│   │   └── solutions/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   ├── solucoes/
│   │   ├── contato.astro
│   │   ├── index.astro
│   │   └── sobre.astro
│   ├── styles/
│   └── content.config.ts
├── astro.config.mjs
└── package.json
```

## Convenções

- `src/data`: dados institucionais compartilhados, navegação, métricas e blocos reutilizáveis.
- `src/content/solutions`: fonte de verdade das soluções; cada arquivo representa uma página dinâmica.
- `src/components/ui`: primitives e blocos atômicos reutilizáveis.
- `src/components/sections`: composição de seções institucionais de página.
- `src/layouts`: layouts base com shell global e SEO.
- Tokens visuais e classes semânticas ficam centralizados em [`src/styles/global.css`](./src/styles/global.css).

## Fluxo de conteúdo

1. Adicione ou edite um arquivo em `src/content/solutions`.
2. Preencha frontmatter conforme o schema em `src/content.config.ts`.
3. A solução passa a aparecer no índice `/solucoes` e gera sua rota automaticamente em `/solucoes/[slug]`.

## Scripts

- `npm run dev`: servidor local
- `npm run build`: build estática de produção
- `npm run preview`: pré-visualização do build
- `npm run build:html`: gera versão estática em HTML + Tailwind (sem Astro runtime) em `tailwind-html/`

## Export HTML + Tailwind

A pasta `tailwind-html/` contém a versão convertida do projeto para HTML estático com foco em Tailwind (via CDN), mantendo:

- páginas institucionais (`index`, `sobre`, `contato`, `solucoes`);
- páginas individuais de cada solução em `tailwind-html/solucoes/*.html`;
- assets copiados de `public/` para manter imagens, favicon e SVGs.

O gerador está em [`scripts/generate-tailwind-html.mjs`](./scripts/generate-tailwind-html.mjs) e lê os conteúdos de `src/content/solutions`.

## Próximas extensões naturais

- integrar formulário a um provedor real;
- conectar imagens/fotografia institucional final da marca;
- adicionar sitemap, schema.org e analytics;
- evoluir design system com mais variantes e padrões editoriais.
