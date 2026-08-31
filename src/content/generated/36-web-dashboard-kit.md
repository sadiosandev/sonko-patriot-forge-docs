# Web Dashboard Kit

## `spforge:web:install`

Installs the modern SonkoPatriot Forge dashboard shell used by generated Blade scaffolds and selects the default web table engine.

```bash
php artisan spforge:web:install --table=bootstrap
```

or:

```bash
php artisan spforge:web:install --table=yajra-laravel-datatables
```

### Options

| Option | Description | Default |
|---|---|---|
| `--force` | Overwrite dashboard files already installed | false |
| `--path=` | Dashboard URL path | `dashboard` |
| `--middleware=` | Middleware protecting the dashboard route | `auth` |
| `--table=` | Dashboard table driver: `bootstrap` or `yajra-laravel-datatables` | `bootstrap` |

> Here `--table` belongs to `spforge:web:install` and selects the dashboard table engine. On model/scaffold generators, `--table` continues to mean the SQL table name; use `--tableDriver` to override the web table engine for one scaffold.

### Installed files

```text
resources/views/layouts/app.blade.php
resources/views/layouts/menu.blade.php
resources/views/layouts/partials/sidebar.blade.php
resources/views/layouts/partials/topbar.blade.php
resources/views/components/flash.blade.php
resources/views/dashboard/index.blade.php
public/vendor/spforge-dashboard/css/spforge-dashboard.css
public/vendor/spforge-dashboard/js/spforge-dashboard.js
```

It also appends the named `spforge.dashboard` route to `routes/web.php` and updates `config/sonkopatriot_forge.php`.

## Dashboard capabilities

The installed dashboard provides a reusable administration shell for every generated web scaffold:

- responsive Bootstrap 5 layout;
- collapsible sidebar and topbar;
- active-aware scaffold navigation;
- persistent light/dark theme using `localStorage`;
- configurable branding and colors;
- flash/validation message component;
- Chart.js-ready dashboard widgets;
- automatic menu insertion for generated scaffolds;
- support for Bootstrap tables and Yajra Laravel DataTables;
- `@stack('styles')` and `@stack('scripts')` extension points for module-specific assets.

## Customization

The dashboard is intentionally editable by the application developer. The main runtime settings live in `config/sonkopatriot_forge.php`:

```php
'web_dashboard' => [
    'enabled' => true,
    'path' => 'dashboard',
    'middleware' => 'auth',
    'table_driver' => 'bootstrap',
    'theme' => 'modern',
    'brand_name' => 'SonkoPatriot',
    'brand_suffix' => 'Forge',
    'logo' => null,
    'colors' => [
        'primary' => '#5b3df5',
        'sidebar' => '#07152e',
        'sidebar_secondary' => '#031124',
        'sidebar_accent' => '#5b3df5',
        'background' => '#f5f7fb',
    ],
],
```

### Branding and logo

Change the product identity without touching the package source:

```php
'brand_name' => 'My Company',
'brand_suffix' => 'Admin',
'logo' => 'images/logo.svg',
```

The generated Blade layout reads the published application configuration, so these values belong to your project and remain under your control.

### Colors

The dashboard exposes its main design tokens through configuration. For example:

```php
'colors' => [
    'primary' => '#5b3df5',
    'sidebar' => '#07152e',
    'sidebar_secondary' => '#031124',
    'sidebar_accent' => '#5b3df5',
    'background' => '#f5f7fb',
],
```

For deeper visual customization, edit the published stylesheet:

```text
public/vendor/spforge-dashboard/css/spforge-dashboard.css
```

and the dashboard Blade structure under:

```text
resources/views/layouts/
resources/views/dashboard/
```

### Sidebar and automatic menu

SPForge scaffolds append their navigation entries to:

```text
resources/views/layouts/menu.blade.php
```

A generated module keeps its web route names separate from API route names. For example:

```text
articles.index          -> /articles
api.articles.index      -> /api/articles
```

This keeps sidebar links predictable and avoids route-name collisions between Web and API scaffolds.

### Dark mode

The dashboard includes a theme toggle. The selected theme is stored in the browser under:

```text
spforge-theme
```

The JavaScript responsible for sidebar behavior, theme persistence and dashboard interactions is published to:

```text
public/vendor/spforge-dashboard/js/spforge-dashboard.js
```

### Route and middleware

The default dashboard route is named:

```text
spforge.dashboard
```

and points to `/dashboard`. Customize the URL and middleware at installation time:

```bash
php artisan spforge:web:install --path=backoffice --middleware=auth,verified --table=bootstrap
```

### Reinstalling after customization

Running `spforge:web:install` without `--force` preserves dashboard files that already exist. Use `--force` only when you intentionally want SPForge to overwrite the published dashboard/auth files:

```bash
php artisan spforge:web:install --force --table=bootstrap
```

> Keep application-specific customizations in the published project files and configuration. Package updates should not require editing files inside `vendor/`.

## Web table drivers

### `bootstrap`

This is the lightweight default. It generates Bootstrap 5 markup and uses Laravel pagination. No client-side DataTables library is required.

Generated flow:

```text
Browser -> Laravel controller -> Eloquent/Repository -> paginate() -> Blade Bootstrap table
```

Use it for standard back-office screens and small/medium result sets.

### `yajra-laravel-datatables`

This driver uses `yajra/laravel-datatables:^13.0`, the Laravel 13 compatible Yajra Laravel DataTables package. It provides server-side processing suitable for large datasets.

Generated flow:

```text
DataTables UI -> Ajax -> ArticleDataTable -> Eloquent query -> database
```

For a model such as `Article`, SPForge generates:

```text
app/DataTables/ArticleDataTable.php
resources/views/articles/table.blade.php
resources/views/articles/datatables_actions.blade.php
```

The generated DataTable service includes:

- Eloquent server-side processing;
- searchable/sortable columns;
- server-side pagination;
- state save;
- responsive Bootstrap 5 integration;
- configurable page length;
- generated View / Edit / Delete actions;
- support for custom primary keys via the generator configuration.

The generated page loads jQuery and DataTables 2.x Bootstrap 5/Responsive assets only when a Yajra table is actually used.

### Global selection

```php
'web_dashboard' => [
    'enabled' => true,
    'path' => 'dashboard',
    'middleware' => 'auth',
    'table_driver' => 'bootstrap',
    'theme' => 'modern',
],
```

Allowed values:

```text
bootstrap
yajra-laravel-datatables
```

### Per-module selection

```bash
php artisan spforge:scaffold Article --tableDriver=yajra-laravel-datatables
php artisan spforge:scaffold Category --tableDriver=bootstrap
```

The override is useful when most modules use Bootstrap tables but a high-volume module requires server-side DataTables.

### Recommended workflow

```bash
php artisan spforge:web:install --table=bootstrap
php artisan spforge:api-scaffold Article --tableDriver=yajra-laravel-datatables --permissions --activityLog --searchable --excel --middleware=auth
php artisan spforge:scaffold Category --tableDriver=bootstrap --permissions --middleware=auth
```

Each generated scaffold appends an active-aware link to `resources/views/layouts/menu.blade.php`.

Use `--skipWebCheck` only when the application supplies its own `layouts.app` and menu integration.

## Yajra Laravel DataTables dependency

SPForge v0.8 requires:

```json
"yajra/laravel-datatables": "^13.0"
```

This is the all-in-one Laravel DataTables package for Laravel 13. After upgrading SPForge, refresh Composer dependencies with:

```bash
composer update sadio-sanghare/sonko-patriot-forge yajra/laravel-datatables -W
```

## License

SonkoPatriot Forge is distributed under the MIT License with the copyright notices preserved in `LICENSE` for InfyOm Labs (2016) and SonkoPatriot Labs (2026).
