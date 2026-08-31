# 8. Laravel 13 model conventions

When enabled, generated Models use Laravel 13 PHP Attributes such as:

```php
#[Table('products')]
#[Fillable([
    'name',
    'description',
    'price',
])]
#[UseResource(ProductResource::class)]
#[UsePolicy(ProductPolicy::class)]
#[ObservedBy([ProductObserver::class])]
class Product extends Model
{
    // ...
}
```

Generated casts use a modern method:

```php
protected function casts(): array
{
    return [
        'price' => 'decimal:2',
        'status' => ProductStatus::class,
    ];
}
```

`declare(strict_types=1);` is enabled by default for generated modern classes.

---
