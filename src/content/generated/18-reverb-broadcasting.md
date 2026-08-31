# 18. Reverb / broadcasting

Install broadcasting:

```bash
php artisan spforge:features:install --reverb
```

Enable generated lifecycle broadcasts:

```bash
php artisan spforge:api Product --broadcast
```

Custom channel prefix:

```bash
php artisan spforge:api Product --broadcast --broadcastChannelPrefix=catalog
```

Generated lifecycle events may include:

```text
ProductCreated
ProductUpdated
ProductDeleted
```

Broadcasting or notifications may require an Observer; SPForge enables/generates the relevant lifecycle integration when needed.

---
