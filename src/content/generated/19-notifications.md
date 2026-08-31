# 19. Notifications

Enable:

```bash
php artisan spforge:api Product --notifications
```

Select channels:

```bash
php artisan spforge:api Product \
    --notifications \
    --notify=database \
    --notify=mail \
    --notify=broadcast
```

Install database notifications table:

```bash
php artisan spforge:features:install --notifications --migrate
```

Generated notification classes correspond to model lifecycle events.

---
