# 30. Windows / Laragon notes

After replacing a local package version:

```bat
composer dump-autoload
php artisan optimize:clear
```

Check the PHP CLI configuration:

```bat
php --ini
```

Check ZIP:

```bat
php -m | findstr /I zip
```

Laravel Excel XLSX requires ZIP. Media Library may require fileinfo/exif and image-related extensions depending on your conversions.

Horizon is optional and is not a required SPForge dependency; use it primarily on Linux/Redis deployments.

---
