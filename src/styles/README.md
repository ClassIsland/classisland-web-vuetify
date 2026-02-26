# Styles

This directory is for configuring the styles of the application.

## Tailwind CSS

Tailwind CSS v4 is integrated through the Vite plugin:

- `@tailwindcss/vite` is registered in `vite.config.mts`.
- `@import "tailwindcss";` is loaded in `src/styles/tailwind.css`.
- `@source` is declared in `src/styles/tailwind.css` so class scanning and hot updates are reliable in dev mode.

You can now use Tailwind utility classes directly in Vue templates.
