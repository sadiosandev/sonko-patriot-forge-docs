# Web Authentication Kit (v0.9)

## Goal

`spforge:web:install --auth` installs a complete, native Laravel web authentication flow that visually matches the SonkoPatriot Forge dashboard. It does not depend on Breeze for pages or controllers.

The generated code uses Laravel's native authentication primitives:

- `Auth::attempt()` and session regeneration for login;
- `Registered` event for registration;
- `Password::sendResetLink()` for forgotten passwords;
- `Password::reset()` for reset links;
- `EmailVerificationRequest` and signed/throttled verification URLs;
- password confirmation sessions;
- `guest`, `auth`, `signed`, `verified` and `throttle` middleware.

## Installation commands

Dashboard + Auth + Bootstrap tables:

```bash
php artisan spforge:web:install --auth --table=bootstrap
```

Dashboard + Auth + Yajra Laravel DataTables:

```bash
php artisan spforge:web:install --auth --table=yajra-laravel-datatables
```

Dashboard requiring a verified email:

```bash
php artisan spforge:web:install --auth --middleware=auth,verified --table=yajra-laravel-datatables
```

Authentication without public registration:

```bash
php artisan spforge:web:install --auth --no-registration --table=bootstrap
```

Authentication without email verification:

```bash
php artisan spforge:web:install --auth --no-email-verification --table=bootstrap
```

Overwrite previously installed dashboard/auth files:

```bash
php artisan spforge:web:install --auth --force --table=yajra-laravel-datatables
```

## `spforge:web:install` options related to auth

| Option | Type | Purpose |
| --- | --- | --- |
| `--auth` | flag | Install all authentication controllers/routes/views/assets |
| `--no-registration` | flag | Disable registration routes/pages |
| `--no-email-verification` | flag | Disable verification routes and User `MustVerifyEmail` patch |
| `--path=PATH` | value | Dashboard route and default auth redirect destination |
| `--middleware=LIST` | value | Comma-separated dashboard middleware, for example `auth,verified` |
| `--force` | flag | Replace previously generated web/auth files |
| `--table=DRIVER` | value | `bootstrap` or `yajra-laravel-datatables` for generated scaffolds |

## Generated authentication files

```text
app/Http/Controllers/Auth/
├── AuthenticatedSessionController.php
├── ConfirmablePasswordController.php
├── EmailVerificationNotificationController.php
├── EmailVerificationPromptController.php
├── NewPasswordController.php
├── PasswordResetLinkController.php
├── RegisteredUserController.php
└── VerifyEmailController.php

resources/views/auth/
├── layouts/
│   └── guest.blade.php
├── confirm-password.blade.php
├── forgot-password.blade.php
├── login.blade.php
├── register.blade.php
├── reset-password.blade.php
└── verify-email.blade.php

routes/
└── spforge-auth.php

public/vendor/spforge-auth/css/
└── spforge-auth.css
```

`routes/web.php` receives only one registration line:

```php
require __DIR__.'/spforge-auth.php';
```

This keeps application routing easy to audit and customize.

## Authentication routes

| Method | URI | Name | Middleware |
| --- | --- | --- | --- |
| GET | `/login` | `login` | `guest` |
| POST | `/login` | `login.store` | `guest` |
| GET | `/register` | `register` | `guest`, if enabled |
| POST | `/register` | `register.store` | `guest`, if enabled |
| GET | `/forgot-password` | `password.request` | `guest` |
| POST | `/forgot-password` | `password.email` | `guest` |
| GET | `/reset-password/{token}` | `password.reset` | `guest` |
| POST | `/reset-password` | `password.store` | `guest` |
| GET | `/confirm-password` | `password.confirm` | `auth` |
| POST | `/confirm-password` | `password.confirm.store` | `auth` |
| GET | `/verify-email` | `verification.notice` | `auth`, if enabled |
| GET | `/verify-email/{id}/{hash}` | `verification.verify` | `auth`, `signed`, `throttle:6,1` |
| POST | `/email/verification-notification` | `verification.send` | `auth`, `throttle:6,1` |
| POST | `/logout` | `logout` | `auth` |

## Email verification

When verification is enabled, the installer safely updates `App\Models\User` to implement:

```php
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
```

The patch also recognizes and replaces the commented import present in the standard Laravel skeleton.

Use this dashboard middleware if only verified users should access the dashboard:

```bash
--middleware=auth,verified
```

## UI architecture

The auth UI is a responsive Bootstrap 5 design with:

- large gradient marketing panel on desktop;
- compact mobile branding;
- modern white auth card;
- configurable logo and colors;
- password reveal controls;
- inline validation errors;
- status/success notices;
- responsive registration form;
- verification and password-reset states;
- no fake social authentication routes.

## Customization

The generated controllers, routes, views and CSS are copied into the host application. They are intentionally developer-owned after installation.

Global design/behavior defaults live in:

```php
config/sonkopatriot_forge.php
```

### `web_auth`

```php
'web_auth' => [
    'enabled' => true,
    'registration' => true,
    'email_verification' => true,
    'remember_me' => true,
    'redirect_after_login' => '/dashboard',
    'redirect_after_verification' => '/dashboard',
    'redirect_after_password_confirmation' => '/dashboard',
    'brand_name' => 'SonkoPatriot',
    'brand_suffix' => 'Forge',
    'logo' => null,
    'show_marketing_panel' => true,
    'footer' => 'Secure by default · Powered by Laravel',
    'colors' => [
        'primary' => '#5b3df5',
        'primary_dark' => '#3922c7',
        'accent' => '#7c5cff',
        'panel' => '#11145a',
    ],
    'copy' => [
        'login_title' => 'Welcome back',
        'login_subtitle' => 'Sign in to your account to continue.',
        'register_title' => 'Create your account',
        'register_subtitle' => 'Fill in the details below to get started.',
    ],
    'marketing' => [
        'kicker' => 'Modern Laravel applications',
        'title' => "Build faster.\nShip smarter.",
        'description' => 'A clean authentication experience built for modern Laravel applications.',
        'features' => [
            'Secure authentication workflow',
            'Responsive Bootstrap 5 interface',
            'Developer-friendly customization',
        ],
    ],
],
```

### `web_dashboard`

Dashboard branding can be customized independently:

```php
'web_dashboard' => [
    'brand_name' => 'My Product',
    'brand_suffix' => 'Admin',
    'logo' => 'images/admin-logo.svg',
    'colors' => [
        'primary' => '#5b3df5',
        'sidebar' => '#07152e',
        'sidebar_secondary' => '#031124',
        'sidebar_accent' => '#5b3df5',
        'background' => '#f5f7fb',
    ],
],
```

Developers may also edit directly:

```text
resources/views/auth/**
public/vendor/spforge-auth/css/spforge-auth.css
resources/views/layouts/**
public/vendor/spforge-dashboard/**
```

Running `spforge:web:install --force` intentionally overwrites those generated customizations, so use `--force` only when a reset is desired.

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
