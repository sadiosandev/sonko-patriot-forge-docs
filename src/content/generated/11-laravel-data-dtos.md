# 11. Laravel Data DTOs

Default config:

```php
'data' => true,
```

Generated DTO path:

```text
app/Data/ProductData.php
```

Controller usage:

```php
$payload = ProductData::from($request->validated())->toArray();
```

Resource usage can also map through the generated Data object.

---
