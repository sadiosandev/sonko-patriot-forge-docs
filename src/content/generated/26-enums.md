# 26. Enums

Enum casts are enabled by default:

```php
'enum_casts' => true,
```

For a database enum such as:

```text
status enum:active,inactive,suspended
```

SPForge can generate a PHP backed enum and cast the Model field to it.

Disable:

```bash
php artisan spforge:api Product --noEnumCasts
```

---
