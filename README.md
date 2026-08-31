# SonkoPatriot Forge Documentation Website

Site ReactJS + TypeScript de documentation pour SonkoPatriot Forge.

## Stack

- React 19
- TypeScript
- Webpack 5 / Webpack Dev Server
- React Router
- React Markdown / GFM
- Fuse.js search
- Bootstrap 5 + Bootstrap Icons
- Highlight.js

Aucun Vite n'est utilisé.

## Installation

```bash
npm install
```

## Développement

```bash
npm start
```

Le site démarre par défaut sur :

```text
http://localhost:3100
```

## Production

```bash
npm run build
```

Le résultat est généré dans :

```text
dist/
```

## Mise à jour de la documentation

Les sources principales sont :

```text
src/content/README.md
src/content/SONKOPATRIOT_FORGE.md
src/content/CHANGELOG.md
src/content/LICENSE.md
```

Après modification :

```bash
npm run docs:generate
```

Le script découpe automatiquement la référence complète en pages Markdown et reconstruit :

```text
src/content/generated/
src/docs.generated.ts
```

`npm start` et `npm run build` exécutent automatiquement cette génération via `prestart` / `prebuild`.

## Personnalisation

Modifier :

```text
src/config/site.ts
src/styles/app.css
```

Vous pouvez changer le nom, la version, les liens GitHub, les couleurs et le branding.

## Fonctionnalités

- landing page
- documentation avec sidebar hiérarchique
- recherche plein texte `Ctrl/Cmd + K`
- dark/light mode persistant
- table des matières automatique
- syntax highlighting
- bouton copier sur les blocs de code
- navigation précédente / suivante
- routing React
- responsive desktop/mobile
- contenu Markdown versionné dans Git
- 55+ pages générées depuis la documentation SPForge

## Dépannage TypeScript / Webpack

Si Webpack affiche `TypeScript emitted no output`, vérifiez que `tsconfig.json` ne contient pas `noEmit: true`. Dans ce projet, l'émission JavaScript est laissée active pour `ts-loader`, tandis que la vérification sans émission reste disponible avec :

```bash
npm run typecheck
```

Pour repartir d'un cache propre :

```bash
rm -rf node_modules dist
npm install
npm start
```

Sous Windows CMD :

```bat
rmdir /s /q node_modules
rmdir /s /q dist
npm install
npm start
```

## v1.0.2 - Highlighted code rendering fix

`rehype-highlight` converts highlighted code into nested React `<span>` nodes. The documentation renderer now extracts plain text recursively for clipboard operations while preserving the highlighted React nodes for display. This prevents `[object Object]` from appearing in JSON, PHP, Bash, and other highlighted code blocks. Language labels are also normalized (`JSON`, `PHP`, `BASH`, etc.) instead of `HLJS JSON`.

## v1.0.3 documentation fixes

- Web Dashboard and Web Authentication top-level chapters retain their nested sections instead of producing empty parent pages.
- The generated-page notice was removed globally.
- Web Dashboard documentation now includes customization, branding, colors, dark mode, menu behavior, route naming and table drivers.

## Deploying to GitHub Pages

This project is ready for GitHub Pages through GitHub Actions.

### 1. Push the documentation project to GitHub

```bash
git init
git branch -M main
git add .
git commit -m "Publish SonkoPatriot Forge documentation"
git remote add origin https://github.com/YOUR_USERNAME/sonkopatriot-forge-docs.git
git push -u origin main
```

### 2. Enable GitHub Pages

Open the repository on GitHub and go to:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

The included workflow `.github/workflows/deploy-pages.yml` will install dependencies, build and deploy the site after every push to `main`. If you generate a `package-lock.json` locally, commit it for fully reproducible dependency versions.

For a project repository named `sonkopatriot-forge-docs`, the URL will normally be:

```text
https://YOUR_USERNAME.github.io/sonkopatriot-forge-docs/
```

The Webpack build automatically detects the GitHub repository name and configures the correct asset base path and React Router basename.

### React Router on GitHub Pages

The build creates `dist/404.html` automatically. This allows direct navigation and browser refresh on routes such as:

```text
/docs/installation
/docs/web-dashboard-kit
/docs/swagger
```

The build also creates `dist/.nojekyll` so GitHub Pages serves the generated assets without Jekyll processing.

### Custom base path

For a custom deployment path, define `BASE_PATH` before building:

```bash
BASE_PATH=/docs npm run build
```

On Windows CMD:

```bat
set BASE_PATH=/docs
npm run build
```

For a user or organization repository named `YOUR_USERNAME.github.io`, the base path is detected as `/` automatically.
