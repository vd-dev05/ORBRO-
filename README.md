# Orbro Next.js 15 Boilerplate

> **Modern, scalable, and type-safe Next.js 15 project with App Router, React 19, Tailwind CSS v4, Framer Motion, Recharts, i18n, testing, code quality, and Copilot AI integration.**

## Features

- **Framework:** Next.js 15 (App Router) & React 19
- **Language:** TypeScript (full type safety)
- **Styling:** Tailwind CSS v4 (responsive, utility-first)
- **Animation:** Framer Motion (micro-interactions)
- **Charts:** Recharts (data visualization)
- **Icons:** Heroicons, React Icons, custom SVGs
- **i18n:** Simple file-based, scalable multi-language support
- **Testing:** Jest, Testing Library, Playwright (visual)
- **Code Quality:** ESLint + Prettier (Next.js config)
- **Performance:** Optimized images, lazy loading, static export ready
- **AI:** GitHub Copilot & Copilot Chat (recommended for productivity)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (unit & integration)
npm run test

# Run Playwright (visual tests)
npx playwright test

# Lint & format code
npm run lint
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  [lang]/           # Dynamic language segment (i18n)
    layout.tsx
    translations.ts  # Language resources (en, vi, ...)
    test-page/
      page.tsx       # Example i18n page
      page.test.tsx  # Unit test for the page
  components/        # Reusable UI components
  features/          # Feature logic, hooks, helpers
  types/             # Shared TypeScript types
public/              # Static assets
```

## i18n (Internationalization)

- Language resources are defined in `app/[lang]/translations.ts`.
- Add new languages by extending the translations object.
- Access via `/en/test-page`, `/vi/test-page`, ...

## Testing & Code Quality

- **Jest** & **Testing Library**: Unit/integration tests (`*.test.tsx`)
- **Playwright**: Visual/browser tests (`/tests`)
- **ESLint** & **Prettier**: Consistent code style

## Copilot AI Integration

- Use [GitHub Copilot](https://github.com/features/copilot) and [Copilot Chat](https://github.com/features/copilot-chat) in VS Code for AI-powered code suggestions, refactoring, and documentation.
- Recommended VS Code extensions:
  - `GitHub.copilot`
  - `GitHub.copilot-chat`

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) or any static hosting.

## License

MIT
