# Algrid International

Production website for Algrid International, built with Next.js App Router,
React, TypeScript, Tailwind CSS and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` by default.

## Release checks

```bash
npm run lint
npm run type-check
npm run build
npm audit
```

## Contact form configuration

The project enquiry form sends through Resend. Copy `.env.example` to
`.env.local` for local development and configure the same variables in Vercel:

- `RESEND_API_KEY` — server-side Resend API key
- `CONTACT_FROM_EMAIL` — verified sender on `algridinternational.com`
- `CONTACT_TO_EMAIL` — enquiry destination

Verify `algridinternational.com` in Resend before production launch. Never
expose the API key in a `NEXT_PUBLIC_` variable or commit it to Git.

## Deployment

The repository is deployed as a standard Next.js project on Vercel. Keep the
Framework Preset set to Next.js, leave Output Directory blank, and use
`npm run build` as the build command.
