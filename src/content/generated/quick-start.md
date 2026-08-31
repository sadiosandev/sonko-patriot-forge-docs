# SonkoPatriot Forge

**Modern Laravel 13 API & Module Generator**

SonkoPatriot Forge (SPForge) is a Laravel 13 native code generator designed to build production-oriented APIs and CRUD modules with modern Laravel conventions and optional enterprise features.

It can generate Models, migrations, repositories, Form Requests, API controllers, Resources, tests, policies, observers, DTOs, permissions, OpenAPI documentation, activity logs, media handling, full-text search, Excel imports/exports, queues, broadcasts, and notifications from a single Artisan command.

## Requirements

- PHP `^8.3`
- Laravel / Illuminate `^13.0`
- Composer 2
- PHP extensions required by your enabled features, notably `zip`, `xml`, `gd`, `fileinfo`, `exif` for Excel / Media Library as applicable

Core package integrations:

- Spatie Laravel Data
- Spatie Query Builder
- Spatie Permission
- Spatie Activitylog
- Spatie Media Library
- Laravel Scout
- Laravel Excel
- Laravel Reverb
- Laravel Notifications
- swagger-php / OpenAPI 3

## Local installation

For local development, place the package at:

```text
packages/sonkopatriot/forge
```

Add a path repository to the application's `composer.json`:

```json
"repositories": [
    {
        "type": "path",
        "url": "packages/sonkopatriot/forge",
        "options": {
            "symlink": true
        }
    }
]
```

Install it:

```bash
composer require "sadio-sanghare/sonko-patriot-forge:@dev"
```

Publish the SPForge configuration:

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-config
```

This creates:

```text
config/sonkopatriot_forge.php
```

Initialize the generator:

```bash
php artisan spforge:publish
```

## Quick start

Generate a modern API:

```bash
php artisan spforge:api Product \
    --resources \
    --resourceCollection \
    --factory \
    --seeder \
    --tests \
    --policy \
    --observer \
    --middleware=auth:sanctum \
    --swagger \
    --perPage=100
```

Windows CMD:

```bat
php artisan spforge:api Product ^
    --resources ^
    --resourceCollection ^
    --factory ^
    --seeder ^
    --tests ^
    --policy ^
    --observer ^
    --middleware=auth:sanctum ^
    --swagger ^
    --perPage=100
```

Field input examples:

```text
name string
required

description text
nullable

price decimal
required|numeric

status enum:active,inactive,archived
required

exit
```

`html_type` is optional. `name string` is valid and defaults to a text input when scaffold HTML generation needs it.

## Enterprise preset

The easiest way to enable the complete v0.6 stack is:

```bash
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

`--enterprise` enables the main SPForge enterprise capabilities, including Data DTOs, Query Builder, permissions/policy, resources, tests, audit logging, media, Scout search, Excel, queues, broadcasting, notifications and Swagger.

Before using all enterprise integrations, install/publish their infrastructure:

```bash
php artisan spforge:features:install --all --migrate
```

## Main Artisan commands

| Command | Description |
|---|---|
| `spforge:api Model` | Generate a full CRUD API |
| `spforge:api-scaffold Model` | Generate API + web scaffold |
| `spforge:scaffold Model` | Generate a web CRUD scaffold |
| `spforge:model Model` | Generate only the model layer |
| `spforge:migration Model` | Generate a migration |
| `spforge:repository Model` | Generate a repository |
| `spforge:api:controller Model` | Generate only an API controller |
| `spforge:api:requests Model` | Generate API Form Requests |
| `spforge:api:tests Model` | Generate API/repository tests |
| `spforge:scaffold:controller Model` | Generate scaffold controller |
| `spforge:scaffold:requests Model` | Generate scaffold requests |
| `spforge:scaffold:views Model` | Generate scaffold views |
| `spforge:publish` | Initialize API routes/base files |
| `spforge:publish:user` | Publish the users CRUD scaffold |
| `spforge:publish:tables datatable\|livewire` | Publish table helper views |
| `spforge:permissions:install` | Prepare Spatie Permission |
| `spforge:features:install` | Install/publish optional feature infrastructure |
| `spforge:web:install` | Install the modern web dashboard, optional native Auth Kit, and choose the scaffold table driver |
| `spforge:swagger` | Generate OpenAPI JSON/YAML |
| `spforge:rollback Model api\|scaffold\|api_scaffold` | Remove generated artifacts |

Run:

```bash
php artisan list spforge
```

for the list registered in your application.

## Common generator options

The following options are available on the main generator commands derived from the SPForge base command.

### Input and database

| Option | Description |
|---|---|
| `--fieldsFile=FILE` | Load fields from a JSON schema file |
| `--jsonFromGUI=JSON` | Load generator payload from a JSON string |
| `--plural=NAME` | Override plural model name |
| `--table=TABLE` | Override table name |
| `--fromTable` | Reverse-generate from an existing table |
| `--ignoreFields=a,b` | Ignore fields when using `--fromTable` |
| `--primary=FIELD` | Use a custom primary key |
| `--connection=NAME` | Use a database connection |
| `--relations` | Prompt for field relations |
| `--softDelete` | Enable Eloquent SoftDeletes |
| `--forceMigrate` | Run generated migration automatically |

### Generation control

| Option | Description |
|---|---|
| `--prefix=PREFIX` | Prefix generated files/names |
| `--skip=...` | Skip selected generated artifacts |
| `--views=index,create,...` | Restrict scaffold views |
| `--factory` | Generate factory |
| `--seeder` | Generate seeder |
| `--tests` | Generate API/repository tests |
| `--resources` | Generate API Resource |
| `--resourceCollection` | Generate dedicated ResourceCollection |
| `--policy` | Generate Laravel Policy and bind it via `#[UsePolicy]` |
| `--observer` | Generate Observer and bind it via `#[ObservedBy]` |
| `--noRepository` | Generate direct Eloquent controller logic |
| `--noRouteModelBinding` | Disable implicit route model binding |
| `--noPagination` | Disable index pagination |
| `--perPage=N` | Default pagination size |
| `--tableDriver=DRIVER` | Override the web scaffold table driver: `bootstrap` or `yajra-laravel-datatables` |
| `--skipWebCheck` | Allow scaffold generation when using a custom web layout/dashboard |
| `--noEnumCasts` | Disable generated enum classes/casts |


### Yajra Blade generation note

SPForge preserves Yajra runtime expressions such as `{!! $dataTable->table(...) !!}` and `{!! $dataTable->scripts() !!}` in the generated Blade view. These expressions are evaluated only when Laravel renders the scaffold page, never while the generator is creating the files.

`--skip` accepts: `migration,model,controllers,api_controller,scaffold_controller,repository,requests,api_requests,scaffold_requests,routes,api_routes,scaffold_routes,views,tests,menu,dump-autoload`.

### Laravel 13 / API options

| Option | Description |
|---|---|
| `--middleware=NAME` | Add `#[Middleware]`; repeatable |
| `--swagger` | Generate OpenAPI attributes and rebuild specification |
| `--data` | Generate Laravel Data DTO |
| `--noData` | Disable DTO generation |
| `--queryBuilder` | Enable Spatie Query Builder |
| `--noQueryBuilder` | Disable Query Builder |
| `--permissions` | Generate CRUD permissions + permission-aware policy |
| `--permissionGuard=GUARD` | Permission guard, default `web` |
| `--enterprise` | Enable the complete v0.6 enterprise preset |

### v0.6 feature options

| Option | Description |
|---|---|
| `--activityLog` | Add Spatie Activitylog to the model |
| `--media` | Add Media Library and media endpoints |
| `--mediaCollection=NAME` | Default media collection |
| `--mediaDisk=DISK` | Media disk |
| `--searchable` | Add Laravel Scout search support |
| `--excel` | Generate Excel Import/Export classes and endpoints |
| `--queue` | Generate queued Excel/realtime jobs where applicable |
| `--queueConnection=NAME` | Queue connection |
| `--queueName=NAME` | Queue name |
| `--broadcast` | Generate Reverb-compatible lifecycle broadcasts |
| `--broadcastChannelPrefix=PREFIX` | Broadcast channel prefix |
| `--notifications` | Generate lifecycle Notifications |
| `--notify=CHANNEL` | Notification channel; repeatable (`database`, `mail`, `broadcast`) |

## Feature installer

Install everything:

```bash
php artisan spforge:features:install --all --migrate
```

Or selectively:

```bash
php artisan spforge:features:install --permissions --patchUser
php artisan spforge:features:install --activityLog
php artisan spforge:features:install --media
php artisan spforge:features:install --scout
php artisan spforge:features:install --excel
php artisan spforge:features:install --reverb
php artisan spforge:features:install --notifications
```

Available options:

```text
--all
--permissions
--patchUser
--activityLog
--media
--scout
--excel
--reverb
--notifications
--migrate
```

## Permission setup

Dedicated installer:

```bash
php artisan spforge:permissions:install --patch-user --migrate
```

Options:

- `--patch-user`: add `Spatie\Permission\Traits\HasRoles` to `App\Models\User`
- `--migrate`: run migrations
- `--force`: overwrite already published Spatie Permission files

Generate permission-aware CRUD:

```bash
php artisan spforge:api Product --permissions --middleware=auth:sanctum
```

Generated permissions follow the pattern:

```text
products.viewAny
products.view
products.create
products.update
products.delete
products.restore
products.forceDelete
```

## Query Builder

Enabled by default unless disabled in config or with `--noQueryBuilder`.

Generated APIs can support URLs such as:

```text
GET /api/products?filter[name]=phone
GET /api/products?sort=-created_at
GET /api/products?include=category
```

## Laravel Data

Enabled by default. A DTO such as `App\Data\ProductData` is generated and used by create/update/resource flows where supported.

Disable it:

```bash
php artisan spforge:api Product --noData
```

## Activity Log

```bash
php artisan spforge:api Product --activityLog
```

The generated model uses `LogsActivity` and `getActivitylogOptions()`.

## Media Library

```bash
php artisan spforge:api Product --media --mediaCollection=images --mediaDisk=public
```

Typical generated routes include:

```text
POST   /api/products/{product}/media
DELETE /api/products/{product}/media/{media}
```

## Scout search

```bash
php artisan spforge:api Product --searchable
```

Typical endpoint:

```text
GET /api/products/search?q=phone
```

Configure the Scout driver in `config/scout.php` / environment variables.

## Excel import/export

```bash
php artisan spforge:api Product --excel
```

Typical endpoints:

```text
GET  /api/products/export
POST /api/products/import
```

Queued mode:

```bash
php artisan spforge:api Product --excel --queue --queueName=imports
```

On Windows, queued jobs work with supported queue drivers. Laravel Horizon is intentionally optional and is recommended on Linux + Redis, not required by SPForge.

## Broadcasting / Reverb

Install broadcasting infrastructure:

```bash
php artisan spforge:features:install --reverb
```

Generate lifecycle events:

```bash
php artisan spforge:api Product --broadcast --broadcastChannelPrefix=models
```

SPForge can generate Created/Updated/Deleted broadcast events and automatically enable an Observer when lifecycle hooks are required.

## Notifications

```bash
php artisan spforge:api Product --notifications --notify=database --notify=broadcast
```

Database notifications infrastructure can be installed with:

```bash
php artisan spforge:features:install --notifications --migrate
```

## Swagger / OpenAPI

Enable globally:

```php
// config/sonkopatriot_forge.php
'options' => [
    'swagger' => true,
],
```

or per command:

```bash
php artisan spforge:api Product --swagger
```

Generate JSON:

```bash
php artisan spforge:swagger
```

Generate YAML:

```bash
php artisan spforge:swagger --format=yaml
```

Custom output:

```bash
php artisan spforge:swagger --output=public/docs/openapi.json
```

Default Swagger UI:

```text
/api/documentation
```

Default raw specification route:

```text
/api/documentation/openapi.json
```

The Swagger UI and scan paths are configurable in `config/sonkopatriot_forge.php`.

## Generate from an existing table

```bash
php artisan spforge:api Client --fromTable --table=clients --resources --swagger
```

Ignore columns:

```bash
php artisan spforge:api Client --fromTable --table=clients --ignoreFields=legacy_code,temp_value
```

## Schema files

SPForge can save generated field schemas under:

```text
resources/model_schemas/
```

Reuse one:

```bash
php artisan spforge:api Product --fieldsFile=Product.json
```

## Rollback

API:

```bash
php artisan spforge:rollback Product api
```

Scaffold:

```bash
php artisan spforge:rollback Product scaffold
```

API + scaffold:

```bash
php artisan spforge:rollback Product api_scaffold
```

The rollback command removes the generated artifacts enabled by the current SPForge configuration, including Data, policies, observers, permission seeders, Resources, Excel classes, Jobs, broadcast Events and Notifications where applicable.

## Important configuration keys

Main configuration file:

```text
config/sonkopatriot_forge.php
```

Important sections:

- `path`: generated file locations
- `namespace`: generated namespaces
- `api_prefix`
- `options.repository_pattern`
- `options.data`
- `options.query_builder`
- `options.permissions`
- `options.activity_log`
- `options.media`
- `options.searchable`
- `options.excel`
- `options.queue`
- `options.broadcast`
- `options.notifications`
- `options.swagger`
- `options.swagger_ui_*`
- `options.route_model_binding`
- `options.pagination`
- `options.per_page`
- `options.policy`
- `options.observer`
- `options.enum_casts`

See [SONKOPATRIOT_FORGE.md](SONKOPATRIOT_FORGE.md) for the exhaustive reference.

## Troubleshooting

Clear caches after replacing a local package:

```bash
composer dump-autoload
php artisan optimize:clear
```

Check installed commands:

```bash
php artisan list spforge
```

Check Swagger routes:

```bash
php artisan route:list --name=spforge.swagger
```

Check package installation:

```bash
composer show sadio-sanghare/sonko-patriot-forge
```

If Composer reports missing `ext-zip`, enable PHP ZIP before using Laravel Excel. Do not rely on `--ignore-platform-req=ext-zip` for production usage.

If Swagger fails because an unrelated application class cannot be loaded, keep `swagger_scan_paths` restricted to OpenAPI-relevant folders (the package defaults to `app/OpenApi`, `app/Models`, `app/Http/Controllers/API`).

## License and attribution

SonkoPatriot Forge is distributed under the MIT license. Historical upstream attribution is retained in `LICENSE` where required.

## Native Laravel 13 Scaffold templates

SonkoPatriot Forge ships its own Bootstrap 5 Blade templates. No AdminLTE template package is required.

The default configuration is:

```php
'templates' => 'sonkopatriot-forge',
'scaffold_layout' => 'layouts.app',
```

If an older published configuration still contains `adminlte-templates` and that namespace is not installed, SPForge automatically falls back to its bundled templates.

Common generated form inputs include `text`, `email`, `password`, `number`, `date`, `time`, `datetime-local`, `url`, `tel`, `textarea`, `select` / `enum`, `checkbox`, `radio` and `hidden`.

For applications that do not have `resources/views/layouts/menu.blade.php`, automatic menu insertion is skipped without failing scaffold generation.


## Modern Web Dashboard Kit and table drivers (v0.8)

Before generating Blade scaffolds, install the reusable SPForge dashboard shell and choose the default table engine.

### Bootstrap table driver

```bash
php artisan spforge:web:install --table=bootstrap
```

This is the lightweight default. Generated list pages use Bootstrap 5 tables rendered by Laravel with Laravel pagination. It does not require a JavaScript DataTables engine.

### Yajra Laravel DataTables driver

```bash
php artisan spforge:web:install --table=yajra-laravel-datatables
```

This activates the Laravel 13 compatible `yajra/laravel-datatables:^13.0` server-side driver. Generated scaffolds receive a dedicated `App\DataTables\ModelDataTable` service, server-side filtering/sorting/pagination, responsive Bootstrap 5 DataTables UI and generated action buttons.

The dashboard installation creates:

- `resources/views/layouts/app.blade.php`;
- `resources/views/layouts/menu.blade.php`;
- responsive sidebar and topbar partials;
- `/dashboard`, protected by `auth` by default;
- dashboard CSS/JS under `public/vendor/spforge-dashboard`;
- Chart.js dashboard widgets;
- automatic sidebar items for new scaffolds.

Other installer options:

```bash
php artisan spforge:web:install --force --table=bootstrap
php artisan spforge:web:install --path=admin --table=yajra-laravel-datatables
php artisan spforge:web:install --middleware=auth --table=bootstrap
php artisan spforge:web:install --path=backoffice --middleware=auth --table=yajra-laravel-datatables
```

Configuration:

```php
'web_dashboard' => [
    'enabled' => true,
    'path' => 'dashboard',
    'middleware' => 'auth',
    'table_driver' => 'bootstrap', // bootstrap | yajra-laravel-datatables
    'theme' => 'modern',
],
```

### Per-scaffold override

The generator already uses `--table=...` for the SQL table name, so web table selection intentionally uses `--tableDriver=...` on scaffold commands:

```bash
php artisan spforge:scaffold Article --tableDriver=bootstrap
php artisan spforge:scaffold Article --tableDriver=yajra-laravel-datatables
php artisan spforge:api-scaffold Article --tableDriver=yajra-laravel-datatables --permissions --activityLog
```

This override does not alter the configured default. It only affects the scaffold being generated.

### Generated differences

With `bootstrap`, SPForge generates a normal Blade table and Laravel paginator.

With `yajra-laravel-datatables`, SPForge additionally generates:

```text
app/DataTables/ArticleDataTable.php
resources/views/articles/datatables_actions.blade.php
```

The index controller receives `ArticleDataTable` and renders server-side results. The generated table partial loads DataTables 2.x + Bootstrap 5 assets only on pages that need them.

Scaffold commands verify that the Web Dashboard Kit is installed before asking for model fields. Projects that already have their own dashboard may bypass the guard with `--skipWebCheck`.

## License and attribution

SonkoPatriot Forge is distributed under the MIT license. The `LICENSE` file preserves the original InfyOm Labs copyright and adds SonkoPatriot Labs copyright for the modernized fork.

## Modern Web Authentication Kit (v0.9)

SonkoPatriot Forge can install a complete web authentication flow without Laravel Breeze, Jetstream, Fortify UI scaffolding, or another frontend starter kit.

Install the dashboard and authentication UI together:

```bash
php artisan spforge:web:install --auth --table=bootstrap
```

With Yajra Laravel DataTables for future scaffolds:

```bash
php artisan spforge:web:install --auth --table=yajra-laravel-datatables
```

For applications that require verified email access to the dashboard:

```bash
php artisan spforge:web:install --auth --middleware=auth,verified --table=yajra-laravel-datatables
```

Available authentication installer options:

| Option | Description |
| --- | --- |
| `--auth` | Install the SPForge modern authentication kit |
| `--no-registration` | Do not expose public registration routes/pages |
| `--no-email-verification` | Install authentication without email verification |
| `--force` | Overwrite previously generated dashboard/auth files |
| `--path=dashboard` | Dashboard path and post-auth redirect target |
| `--middleware=auth,verified` | Dashboard middleware; comma-separated middleware are supported |

The installer generates:

```text
app/Http/Controllers/Auth/
├── AuthenticatedSessionController.php
├── RegisteredUserController.php
├── PasswordResetLinkController.php
├── NewPasswordController.php
├── EmailVerificationPromptController.php
├── VerifyEmailController.php
├── EmailVerificationNotificationController.php
└── ConfirmablePasswordController.php

resources/views/auth/
├── layouts/guest.blade.php
├── login.blade.php
├── register.blade.php
├── forgot-password.blade.php
├── reset-password.blade.php
├── verify-email.blade.php
└── confirm-password.blade.php

routes/spforge-auth.php
public/vendor/spforge-auth/css/spforge-auth.css
```

Authentication routes include login/logout, registration, forgot/reset password, password confirmation, email verification and verification resend.

When email verification is enabled, SPForge patches `App\Models\User` to implement `Illuminate\Contracts\Auth\MustVerifyEmail`. The patch is designed to handle the commented `MustVerifyEmail` import shipped by the Laravel skeleton.

### Authentication customization

All generated views/controllers are application-owned files, so developers can edit them freely after installation. The visual identity can also be changed without touching the views through `config/sonkopatriot_forge.php`:

```php
'web_auth' => [
    'registration' => true,
    'email_verification' => true,
    'remember_me' => true,

    'redirect_after_login' => '/dashboard',
    'redirect_after_verification' => '/dashboard',
    'redirect_after_password_confirmation' => '/dashboard',

    'brand_name' => 'My Company',
    'brand_suffix' => 'Admin',
    'logo' => 'images/logo.svg',
    'show_marketing_panel' => true,
    'footer' => 'Secure administration portal',

    'colors' => [
        'primary' => '#5b3df5',
        'primary_dark' => '#3922c7',
        'accent' => '#7c5cff',
        'panel' => '#11145a',
    ],

    'copy' => [
        'login_title' => 'Welcome back',
        'login_subtitle' => 'Sign in to continue.',
        'register_title' => 'Create your account',
        'register_subtitle' => 'Fill in your information below.',
    ],

    'marketing' => [
        'kicker' => 'Modern applications',
        'title' => "Build faster.\nShip smarter.",
        'description' => 'Your custom marketing message.',
        'features' => [
            'Secure authentication',
            'Responsive interface',
            'Fully customizable',
        ],
    ],
],
```

The dashboard branding is independently customizable under `web_dashboard.brand_name`, `web_dashboard.brand_suffix`, `web_dashboard.logo` and `web_dashboard.colors`.

> Social-login buttons are intentionally not generated as fake links. OAuth can be added later using Laravel Socialite without changing the core password/session authentication flow.

### Scaffold template rendering safety

SPForge generates Blade source without executing your application layout during generation. Runtime directives such as `@extends`, `@section`, and dashboard components are preserved for the generated view and are only evaluated when the application serves the page.

## Scaffold field template pack

SonkoPatriot Forge resolves scaffold form inputs from its native template pack:

```text
sonkopatriot-forge::templates.scaffold.fields.*
```

Supported field templates include `text`, `textarea`, `select` / `enum`, `datetime-local`, `checkbox`, `number`, `email`, `password`, `date`, `time`, `url`, `tel`, `hidden`, and radio inputs.

This path is internal to the generator; generated applications do not need to publish these templates unless they want to customize them.


## Scaffold field template safety

SPForge uses a two-phase Blade generation strategy for scaffold form controls. Runtime directives such as `@error`, `@checked`, `@selected`, `@foreach` and runtime `{{ ... }}` expressions are protected while the generator renders its own templates, then restored in the generated application Blade files. This prevents Laravel from compiling runtime-only directives during code generation.

This applies to all native field templates: `text`, `textarea`, `select`, `enum`, `checkbox`, `radio`, `number`, `date`, `datetime-local`, `time`, `email`, `password`, `url`, `tel`, and `hidden`.

### Scaffold field rendering safety (v0.9.4)

SonkoPatriot Forge computes conditional HTML attributes such as `required` in PHP before rendering scaffold field stubs. Field generator templates do not use inline generator-time `@if/@endif` directives, preventing Blade double-compilation errors while preserving runtime directives such as `@error`, `@checked`, `@selected`, and `@foreach` in the generated application views.



### Safe scaffold menu generation (v0.9.5)

SPForge no longer renders a Blade template that itself contains nested Blade expressions when adding sidebar entries. Menu items are built directly as final Blade code and wrapped with deterministic markers such as:

```blade
{{-- SPForge menu: articles:start --}}
<a href="{{ route('articles.index') }}"
   class="spforge-nav-link {{ request()->routeIs('articles.*') ? 'active' : '' }}">
    <i class="bi bi-folder2-open"></i>
    <span>Articles</span>
</a>
{{-- SPForge menu: articles:end --}}
```

When regenerating the same scaffold, SPForge removes a legacy pre-v0.9.5 entry for that model before adding the safe marked version. This repairs malformed nested-Blade menu entries that could cause `Unclosed '(' does not match '}'` when opening the dashboard.

### Route naming (v0.9.6)

Web scaffold routes keep conventional names such as `articles.index`, while generated API routes always use the `api.` namespace such as `api.articles.index`. This prevents Web/API route-name collisions in `api-scaffold` modules. Scaffold Blade route expressions are emitted only for application runtime, avoiding nested Blade compilation errors.
