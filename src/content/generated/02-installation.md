# 2. Installation

### 2.1 Local path repository

Recommended during SPForge development:

```text
<laravel-project>/packages/sonkopatriot/forge
```

Application `composer.json`:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "packages/sonkopatriot/forge",
            "options": {
                "symlink": true
            }
        }
    ]
}
```

Install:

```bash
composer require "sadio-sanghare/sonko-patriot-forge:@dev"
```

Verify:

```bash
composer show sadio-sanghare/sonko-patriot-forge
php artisan list spforge
```

### 2.2 Publish configuration

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-config
```

Generated file:

```text
config/sonkopatriot_forge.php
```

Optional template publication:

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-templates
```

Optional Swagger UI view publication:

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-swagger-ui
```

### 2.3 Initialize application support files

```bash
php artisan spforge:publish
```

It initializes/updates the API route infrastructure and package base artifacts such as:

- `routes/api.php`
- Laravel 13 `bootstrap/app.php` API route registration when required
- `AppBaseController`
- test support files
- `BaseRepository` when repository pattern is enabled
- API JSON exception behavior / API-first routing support where handled by the publisher

Localized publication:

```bash
php artisan spforge:publish --localized
```

---
