# Architecture Notes

## Runtime

The project targets Next.js 16.3.x with the App Router. Next.js 16 requires asynchronous access to request-time APIs such as `cookies`, `headers`, `params` and `searchParams`.

This MVP deliberately does not read the locale cookie from a Server Component. Doing so would make the route request-dependent and complicate the otherwise static SEO page. The browser persists locale preference in both localStorage and a regular locale cookie. The cookie is not security-sensitive and is intentionally client-readable.

## Internationalization

No locale appears in the URL.

Current public URL:

`/qr-code`

Locale state:

- `pt-BR` default
- future `pt-PT`
- future `en-US`

The message catalog is typed and isolated under `src/i18n/`.

### SEO implication

Cookies/localStorage are appropriate for user preference, but they do not provide separate crawlable URLs for different languages. If international SEO becomes a goal, the routing strategy must be revisited rather than trying to solve indexable localization entirely with client-side state.

## QR generation

QR codes are generated entirely in the browser using `qrcode`.

The same payload is rendered into:

- PNG data URL
- SVG string

No backend, database or API is needed for static QR generation.

## Analytics

Only Vercel Web Analytics is included in V1. Custom events are intentionally excluded until V2.

## Sources checked during implementation

- https://nextjs.org/docs
- https://nextjs.org/docs/app/api-reference/functions/cookies
- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://nextjs.org/blog/next-16-3
- https://www.npmjs.com/package/next
- https://www.npmjs.com/package/qrcode
- https://www.npmjs.com/package/@vercel/analytics
- https://www.npmjs.com/package/tailwindcss
- https://www.npmjs.com/package/@tailwindcss/postcss
- https://www.npmjs.com/package/typescript
