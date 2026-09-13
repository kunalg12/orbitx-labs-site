# OrbitX Labs

Marketing site for **OrbitX Labs** — a small, founder-led agency building AI agents, software, and mobile applications.

Built with Next.js (App Router), React 19, Tailwind CSS v4, and an animated Three.js hero, with GSAP + Framer Motion motion and Lenis smooth scrolling.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) + React 19
- **Styling:** Tailwind CSS v4, light/dark theme with anti-flash inline script
- **3D / visuals:** Three.js via `@react-three/fiber`, `drei`, and `postprocessing`
- **Motion:** GSAP (`@gsap/react`), Framer Motion, Lenis smooth scroll
- **Forms:** React Hook Form + Zod validation
- **Email:** [Resend](https://resend.com) (contact form, currently stubbed — see below)
- **Language:** TypeScript

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # App Router pages & routes
│   ├── page.tsx          # Home
│   ├── layout.tsx        # Root layout (nav, footer, theme, smooth scroll)
│   ├── contact/          # Contact page + form
│   ├── work/             # Work index and [slug] case-study pages
│   └── api/contact/      # Contact form submission handler
├── components/
│   ├── canvas/           # Three.js scene (hero sphere, particle network)
│   ├── layout/           # Nav, ThemeProvider, SmoothScrollProvider
│   ├── sections/         # Home page sections (Hero, Services, Process, …)
│   └── ui/               # Reusable UI (MagneticButton, GlassCard, CustomCursor, …)
├── content/work/         # Case studies as JSON
├── lib/                  # Fonts, GSAP setup, work loader, utils
└── types/                # Shared TypeScript types
```

Case studies live as JSON files in [src/content/work/](src/content/work/) and are rendered by the dynamic route at [src/app/work/[slug]/page.tsx](src/app/work/%5Bslug%5D/page.tsx).

## Contact Form

The contact form posts to [src/app/api/contact/route.ts](src/app/api/contact/route.ts), which validates input with Zod. Submissions are currently logged to the server console. To send email via Resend, set `RESEND_API_KEY` in your environment and uncomment the Resend block in that route.

```bash
# .env.local
RESEND_API_KEY=your_key_here
```

## Deployment

Deploy on [Vercel](https://vercel.com/new) or any platform that supports Next.js. Remember to configure `RESEND_API_KEY` in the deployment environment if you enable email delivery.
