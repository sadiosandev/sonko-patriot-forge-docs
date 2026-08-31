# 20. Swagger / OpenAPI

### Configuration

```php
'options' => [
    'swagger' => true,
    'swagger_output' => storage_path('api-docs/openapi.json'),
    'swagger_title' => env('APP_NAME', 'Laravel').' API',
    'swagger_version' => '1.0.0',
    'swagger_description' => 'Generated API documentation',
    'swagger_scan_paths' => [
        app_path('OpenApi'),
        app_path('Models'),
        app_path('Http/Controllers/API'),
    ],
]
```

SPForge deliberately avoids scanning all of `app/`, preventing unrelated optional classes from breaking OpenAPI generation.

### Generate

```bash
php artisan spforge:swagger
```

YAML:

```bash
php artisan spforge:swagger --format=yaml
```

Custom path:

```bash
php artisan spforge:swagger --output=public/docs/openapi.json
```

### Root definition

SPForge maintains:

```text
app/OpenApi/OpenApiSpec.php
```

with API metadata and a Bearer/Sanctum security scheme.

### Swagger UI

Defaults:

```text
UI   /api/documentation
Spec /api/documentation/openapi.json
```

Config:

```php
'swagger_ui_enabled' => true,
'swagger_ui_path' => 'api/documentation',
'swagger_ui_spec_path' => 'api/documentation/openapi.json',
'swagger_ui_middleware' => [],
'swagger_ui_persist_authorization' => true,
'swagger_ui_deep_linking' => true,
'swagger_ui_display_request_duration' => true,
'swagger_ui_assets_url' => 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5',
```

Protect documentation in production by adding middleware, for example:

```php
'swagger_ui_middleware' => ['auth:sanctum'],
```

---
