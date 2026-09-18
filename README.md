# The Dev Lab — QR Code Generator

MVP de uma ferramenta gratuita de geração de QR Codes para `thedevlab.site/qr-code`.

## Stack

- Next.js 16.3.5
- React 19.3.0
- TypeScript 7.0.2
- Tailwind CSS 4.3.3
- `qrcode` 1.5.4
- Lucide React 1.47.0
- Vercel Analytics 2.0.1

## Funcionalidades do MVP

- Link
- WhatsApp para números brasileiros
- Wi-Fi
- Texto
- Download PNG
- Download SVG
- Geração 100% client-side
- Sem login
- Sem banco de dados
- Sem API
- Vercel Analytics apenas; eventos customizados ficam para V2
- SEO, sitemap, robots, Open Graph e FAQ structured data

## Internacionalização

A aplicação não utiliza locale na URL.

O locale é preparado como estado de aplicação e pode ser persistido em:

- `localStorage`
- cookie `tdl-locale`

Locale padrão atual: `pt-BR`.

Os catálogos futuros já estão previstos para:

- `pt-BR`
- `pt-PT`
- `en-US`

Neste MVP somente o conteúdo `pt-BR` está efetivamente traduzido. A UI não mostra um seletor de idioma enquanto os demais catálogos não estiverem prontos.

### Decisão arquitetural

Não usamos `next-intl` neste MVP. O `next-intl` é uma excelente solução para aplicações com routing internacionalizado, mas a exigência deste projeto é explicitamente não colocar locale na URL. Para uma ferramenta pequena, manter um catálogo tipado e uma camada de locale própria evita introduzir routing/middleware desnecessários.

Quando houver múltiplos idiomas indexáveis para SEO, essa decisão deve ser reavaliada: cookies/localStorage não criam URLs distintas para crawlers. Se o objetivo futuro for SEO internacional por idioma, será necessário considerar URLs, subdomínios ou domínios distintos.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000/qr-code
```

## Validação

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy

O projeto foi estruturado para deploy direto na Vercel.

Depois do primeiro deploy, ative **Web Analytics** no projeto da Vercel. O componente `<Analytics />` já está instalado no layout.

## Estrutura principal

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── qr-code/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── locale-provider.tsx
│   ├── qr-code-generator.tsx
│   └── ui/
├── i18n/
│   ├── config.ts
│   └── messages.ts
└── lib/
    ├── cn.ts
    ├── qr-types.ts
    └── qr.ts
```
