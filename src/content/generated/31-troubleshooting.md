# 31. Troubleshooting

### Commands not visible

```bash
composer dump-autoload
php artisan optimize:clear
php artisan list spforge
```

### Config missing

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-config
```

### Swagger generation

```bash
php artisan spforge:swagger
```

If scanning fails because of unrelated classes, verify:

```php
'swagger_scan_paths' => [
    app_path('OpenApi'),
    app_path('Models'),
    app_path('Http/Controllers/API'),
],
```

### Swagger UI routes

```bash
php artisan route:list --name=spforge.swagger
```

### Sanctum unauthenticated behavior

For API routes, ensure the application has run:

```bash
php artisan spforge:publish
```

and clear caches afterward.

### Permission model patch

```bash
php artisan spforge:permissions:install --patch-user
php -l app/Models/User.php
```

### Composer / vendor corruption

If PHP reports incompatible method signatures inside the same Symfony component, rebuild the affected vendor package or `vendor/` from `composer.lock` before continuing package operations.

---
