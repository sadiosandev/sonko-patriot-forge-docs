# 23. Reverse generation from database

```bash
php artisan spforge:api Customer --fromTable --table=customers
```

With selected features:

```bash
php artisan spforge:api Customer \
    --fromTable \
    --table=customers \
    --ignoreFields=legacy_column \
    --resources \
    --queryBuilder \
    --swagger
```

`from_table.doctrine_mappings` can be customized for database types not mapped by default.

---
