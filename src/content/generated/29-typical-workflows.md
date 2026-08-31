# 29. Typical workflows

### Standard API

```bash
php artisan spforge:api Product \
    --resources \
    --factory \
    --tests \
    --middleware=auth:sanctum
```

### API with permissions

```bash
php artisan spforge:permissions:install --patch-user --migrate
php artisan spforge:api Product --permissions --resources --middleware=auth:sanctum
```

### Searchable audited API

```bash
php artisan spforge:features:install --activityLog --scout --migrate
php artisan spforge:api Product --activityLog --searchable --resources
```

### Media API

```bash
php artisan spforge:features:install --media --migrate
php artisan spforge:api Product --media --mediaCollection=images --resources
```

### Excel queued API

```bash
php artisan spforge:features:install --excel
php artisan spforge:api Customer --excel --queue --queueConnection=redis --queueName=imports
```

### Realtime API

```bash
php artisan spforge:features:install --reverb --notifications --migrate
php artisan spforge:api Product --broadcast --notifications --notify=database --notify=broadcast
```

### Full enterprise module

```bash
php artisan spforge:features:install --all --migrate
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

---
