# 24. Repository Pattern vs direct Eloquent

Default:

```php
'repository_pattern' => true,
```

Generate without repository:

```bash
php artisan spforge:api Product --noRepository
```

This affects controller implementation and whether repository tests/base repository artifacts are required.

---
