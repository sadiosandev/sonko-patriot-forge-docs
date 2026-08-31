# 21. Enterprise preset

Command:

```bash
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

Intended capability set:

```text
Laravel Data
Spatie Query Builder
Permission / Policy
Observer
Factory
Seeder
Tests
Resources
ResourceCollection
Swagger
Activitylog
Media Library
Scout
Excel
Queue
Broadcasting
Notifications
```

Install infrastructure first or once per application:

```bash
php artisan spforge:features:install --all --migrate
```

Then generate enterprise modules repeatedly.

---
