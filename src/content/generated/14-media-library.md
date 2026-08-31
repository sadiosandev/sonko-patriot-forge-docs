# 14. Media Library

Enable:

```bash
php artisan spforge:api Product --media --mediaCollection=images --mediaDisk=public
```

Install:

```bash
php artisan spforge:features:install --media --migrate
```

Typical generated endpoints:

```text
POST   /api/products/{product}/media
DELETE /api/products/{product}/media/{media}
```

Model integration includes `HasMedia` / `InteractsWithMedia` and collection registration.

Default configuration:

```php
'media' => false,
'media_collection' => 'default',
'media_disk' => null,
```

---
