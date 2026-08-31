# 33. Package development / validation

Recommended checks after modifying SPForge:

```bash
composer validate
composer dump-autoload
php artisan list spforge
php artisan spforge:swagger
```

Then generate at least one representative module with the combination of features being changed.

For styling, the repository includes `.editorconfig` with 4-space PHP/Blade indentation and normalized line endings.

---
