# 13. Activitylog

Enable:

```bash
php artisan spforge:api Product --activityLog
```

Install infrastructure:

```bash
php artisan spforge:features:install --activityLog --migrate
```

Config defaults:

```php
'activity_log' => false,
'activity_log_only_dirty' => true,
```

Generated Model integrates `LogsActivity` and an activity log options method.

---
