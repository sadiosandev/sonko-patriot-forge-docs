# 10. Spatie Query Builder

Default config:

```php
'query_builder' => true,
```

Generated example:

```php
$query = QueryBuilder::for($baseQuery)
    ->allowedFilters([
        'name',
        'description',
        'price',
    ])
    ->allowedSorts([
        'id',
        'name',
        'price',
        'created_at',
    ])
    ->allowedIncludes([]);
```

URLs:

```text
GET /api/products?filter[name]=phone
GET /api/products?sort=-created_at
GET /api/products?include=category
```

---
