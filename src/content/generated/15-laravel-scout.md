# 15. Laravel Scout

Enable:

```bash
php artisan spforge:api Product --searchable
```

Publish Scout config:

```bash
php artisan spforge:features:install --scout
```

Generated model uses `Laravel\Scout\Searchable` and exposes searchable data.

Typical API:

```text
GET /api/products/search?q=phone
```

The actual search backend is configured through Laravel Scout (`database`, Algolia, Meilisearch, Typesense, etc. according to your app setup).

---
