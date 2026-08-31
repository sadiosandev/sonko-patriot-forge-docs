# 9. API behavior

### Form Request validation

Rules are generated into Form Requests rather than a legacy static `Model::$rules` property.

Controllers use:

```php
$request->validated()
```

### Route model binding

Enabled by default:

```php
public function show(Product $product): JsonResponse
```

Disable with `--noRouteModelBinding`.

### Pagination

Enabled by default. Generated controllers use the configured `per_page` default and accept a bounded `?per_page=` request value.

Disable with `--noPagination`.

### API JSON errors / Sanctum

SPForge's Laravel 13 publication flow is designed for API-first behavior so unauthenticated `/api/*` requests return JSON instead of attempting to resolve a missing `login` route.

For generated controllers:

```php
#[Middleware('auth:sanctum')]
```

is the native Laravel 13 controller Attribute form.

---
