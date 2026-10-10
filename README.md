# Vitality

Simple, private health calculators: BMI, calories (BMR/TDEE), body fat, and water intake. Everything runs in the browser, with no backend and no accounts.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit and component tests (Vitest + Testing Library) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright smoke tests (builds the app and serves it on port 3100). Run `npx playwright install chromium` once first. |

## Project layout

```
src/
  lib/health.ts          # pure formulas (metric units), the core logic
  lib/parse.ts           # input parsing and sane ranges
  lib/tools.ts           # list of tools (nav + home page)
  components/            # shared UI: NumberField, SegmentedControl, ResultCard, ...
  app/<tool>/page.tsx    # server page (metadata)
  app/<tool>/*-calculator.tsx       # client calculator
  app/<tool>/*-calculator.test.tsx  # component tests
e2e/                     # Playwright tests
```

### Adding a new tool
1. Add the formula to `src/lib/health.ts` and test it in `health.test.ts`.
2. Create `src/app/<tool>/page.tsx` and `<tool>-calculator.tsx` (copy an existing one).
3. Add an entry to `src/lib/tools.ts`. It then shows up in the nav and on the home page.

## Formulas
- **BMI**: weight / height². WHO cut-offs, with optional Asia-Pacific cut-offs (23 / 27.5).
- **BMR**: Mifflin–St Jeor. **TDEE** = BMR × activity factor (1.2–1.9).
- **Body fat**: U.S. Navy circumference method, with ACE categories.
- **Water**: about 33 ml/kg, plus 350 ml per 30 min of exercise.

For general information only. This is not medical advice.

## Deploy to Vercel
Push to GitHub, then on vercel.com choose **Add New → Project** and import the repo. No environment variables are needed. Alternatively, run `npx vercel` from this folder.

CI (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, and e2e tests on every push and pull request.
