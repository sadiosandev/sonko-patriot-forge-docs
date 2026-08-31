## [0.9.6] - 2026-08-30

- Fixed nested Blade route generation in scaffold index/create/edit/show/table views.
- Added runtime-safe route placeholders resolved after scaffold template rendering.
- API resource routes are now always named under the `api.` namespace (for example `api.articles.index`).
- Search, Excel and media API routes also receive explicit `api.*` names.
- Added stable SPForge route block markers for future regeneration and rollback safety.

## 0.9.5 - 2026-08-30

- Fixed generated dashboard menu entries that could cause `Unclosed '(' does not match '}'`.
- Removed nested Blade-from-Blade menu generation.
- Scaffold menu items are now built directly as final Blade code with stable start/end markers.
- Regenerating a scaffold removes legacy malformed menu entries for that model before adding the safe entry.
- Corrected the misleading duplicate API routes console message.

# v0.9.3 - 2026-08-30

## [0.9.4] - 2026-08-30

### Fixed
- Removed generator-time inline `@if/@endif` directives from scaffold field templates.
- HTML attributes such as `required` are now computed by `HTMLFieldGenerator`, preventing nested/double Blade compilation errors.
- Added regression QA requirement: scaffold field stubs must not contain generator-time conditional Blade directives.

## Fixed

- Fixed double-compilation of runtime Blade directives in generated scaffold field templates.
- Runtime `@error`, `@checked`, `@selected`, `@foreach` and `{{ ... }}` expressions are now emitted only after the generator template has rendered.
- Fixed the `text.blade.php` parse error: `unexpected end of file, expecting elseif or else or endif`.
- Applied the fix to all native field templates, not only text inputs.
- Preserved validation options for `select` / `enum` fields while generating their option values.

# v0.9.2 - 2026-08-30

## Fixed

- Fixed scaffold field template resolution for the native SonkoPatriot Forge template pack.
- `HTMLFieldGenerator` now resolves fields from `sonkopatriot-forge::templates.scaffold.fields.*`.
- Fixes generation for `text`, `textarea`, `select`, `enum`, `datetime-local`, `checkbox`, `number`, `email`, `password`, `date`, `time`, `url`, `tel`, `hidden`, and radio inputs.

# Changelog

## v0.9.1 - 2026-08-30

### Fixed
- Prevent Scaffold generator templates from executing the application layout during code generation.
- Escape runtime Blade directives (`@extends`, `@section`, `@endsection`) in scaffold templates.
- Make the Web Dashboard flash component defensive when the `$errors` view variable is unavailable.
- Fix `spforge:api-scaffold` generation failure with `Undefined variable $errors`.

## v0.9.0 - 2026-08-30

- Added `spforge:web:install --auth` to install a complete modern web authentication flow without Breeze.
- Added login, registration, logout, forgot/reset password, password confirmation, email verification and resend verification.
- Added signed/throttled Laravel-native email verification and automatic `MustVerifyEmail` User model patching.
- Added `--no-registration` and `--no-email-verification`.
- Added comma-separated dashboard middleware support such as `--middleware=auth,verified`.
- Added configurable Auth branding, logo, colors, copy, marketing panel, redirects and footer.
- Added configurable Dashboard branding, logo and colors.
- Added modern responsive Bootstrap 5 Auth UI matching the SPForge dashboard design.
- Updated README and `SONKOPATRIOT_FORGE.md` with complete Auth Kit documentation.
- Preserved the requested MIT license attribution for InfyOm Labs and SonkoPatriot Labs.

## v0.8.1 - 2026-08-30

- Fixed Yajra Laravel DataTables scaffold generation: runtime `$dataTable` Blade expressions are now preserved with `@verbatim` instead of being evaluated while SPForge renders its generation template.
- Fixed both `$dataTable->table()` and `$dataTable->scripts()` generation paths.

# 0.8.0 - Web table drivers and Yajra Laravel DataTables

- Added selectable web table drivers: `bootstrap` and `yajra-laravel-datatables`.
- Added `spforge:web:install --table=...`.
- Added per-scaffold `--tableDriver=...` override without conflicting with the existing SQL `--table` option.
- Added `yajra/laravel-datatables:^13.0` for Laravel 13 server-side DataTables.
- Modernized generated Yajra DataTable services, Bootstrap 5 UI, responsive integration and action columns.
- Bootstrap driver now uses server-rendered Bootstrap 5 tables with Laravel pagination and no JavaScript table dependency.
- Updated Web Dashboard assets and documentation.
- Updated MIT license attribution for SonkoPatriot Labs.

# 0.7.0 - Web Dashboard Kit

- Added `spforge:web:install` to install the modern SonkoPatriot Forge web dashboard before generating scaffolds.
- Added Bootstrap 5 dashboard layout, responsive sidebar/topbar, light/dark theme, dashboard page, flash component and reusable assets.
- Added client-side DataTable enhancement (search, sort, page size, pagination) for generated scaffold tables.
- Scaffold menu generation now appends dashboard-native navigation items with active state.
- Added Chart.js dashboard overview and responsive mobile sidebar.
- Dashboard route path and middleware are configurable from the install command.

# Changelog

## 0.6.2 - Laravel 13 native scaffold templates

- Replaced the obsolete default `adminlte-templates` scaffold dependency with templates bundled in SonkoPatriot Forge.
- Added native Bootstrap 5 Blade scaffold templates for tables, pagination, create/edit/show screens and common form field types.
- Added automatic fallback to bundled templates when a published config still references an unavailable external template namespace.
- Made menu generation safe when the application does not contain `resources/views/layouts/menu.blade.php`.
- Added configurable `scaffold_layout` (default: `layouts.app`).


## 0.1.3 - Generated code formatting
- Normalize indentation across Laravel 13 generated stubs.
- Replace `var_export()` array output in Query Builder configuration with short-array syntax.
- Render OpenAPI attributes as readable multiline PHP attributes.
- Normalize `#[Fillable]` and `casts()` arrays in generated models.
- Normalize API/scaffold request rule arrays and API resource arrays.
- Expand generated Policy and Observer methods to PSR-12-friendly multiline bodies.
- Improve generated API/scaffold route formatting.
- Normalize Permission seeders and middleware/authorization attribute arrays.
- Add `.editorconfig` with 4-space indentation, LF endings, final newline, and trailing-whitespace cleanup.
- Add regression tests for generated PHP array formatting helpers.

## 0.1.2
- Fix `spforge:permissions:install --patch-user` on Windows/PHP by removing the fragile namespace PCRE.
- Repair legacy literal `\n` insertions from v0.1.0 and keep the patch idempotent.

## 0.1.1 - Permissions patch fix
- Fix `spforge:permissions:install --patch-user` inserting literal `\\n` sequences in `User.php`.
- Make the User model patch idempotent.
- Auto-repair User models corrupted by SonkoPatriot Forge 0.1.0.

## 0.1.0 - SonkoPatriot Forge
- Full package rebrand to SonkoPatriot Forge / `SonkoPatriotForge` / `spforge:*`.
- Laravel 13 / PHP 8.3 native baseline.
- OpenAPI PHP attributes and built-in Swagger UI.
- API JSON exception rendering and Sanctum guest redirect handling.
- Spatie Laravel Query Builder v7 integration.
- Spatie Laravel Data v4 DTO generation.
- Spatie Laravel Permission v8 integration.
- `spforge:permissions:install` command.
- Laravel 13 policies, observers, enums, factories, seeders, resources and tests.

## 0.6.0 - 2026-08-30

### Enterprise modules (v0.2 -> v0.6 consolidated)
- Added Spatie Activitylog v4 integration (`--activityLog`) compatible with Laravel 13 / PHP 8.3.
- Added Spatie Media Library v11 integration (`--media`, `--mediaCollection`, `--mediaDisk`) and generated media API endpoints.
- Added Laravel Scout v11 integration (`--searchable`) and generated `/search` API endpoint.
- Added Laravel Excel 4 import/export generation (`--excel`).
- Added queued import/export jobs (`--queue`, `--queueConnection`, `--queueName`).
- Added Laravel Reverb-compatible lifecycle broadcasting (`--broadcast`).
- Added Laravel Notifications generation (`--notifications`, `--notify`).
- Added `spforge:features:install` to publish/install Activitylog, Media Library, Scout, Excel, Reverb and notification database support.
- Added `--enterprise` preset to enable the complete SonkoPatriot Forge feature stack.
- Added rollback support for Excel, jobs, events and notifications.
- Kept Horizon optional because its pcntl/posix requirements are not native to Windows; generated jobs remain Horizon-compatible on Linux/Redis deployments.

## 0.6.1 - Documentation

- Rewrote `README.md` as a complete installation and usage guide.
- Rewrote `SONKOPATRIOT_FORGE.md` as the exhaustive SPForge command/configuration/features reference.
- Documented all registered `spforge:*` commands, common generator options, enterprise v0.6 modules, Swagger UI, Permission, Data, Query Builder, Activitylog, Media Library, Scout, Excel, queues, Reverb, notifications, rollback, reverse generation and troubleshooting.
