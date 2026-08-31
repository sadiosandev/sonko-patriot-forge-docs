# 16. Laravel Excel

Enable:

```bash
php artisan spforge:api Product --excel
```

Install/publish config:

```bash
php artisan spforge:features:install --excel
```

Generated:

```text
app/Exports/ProductsExport.php
app/Imports/ProductsImport.php
```

Typical routes:

```text
GET  /api/products/export
POST /api/products/import
```

Queued mode:

```bash
php artisan spforge:api Product --excel --queue --queueConnection=redis --queueName=imports
```

This additionally generates Jobs when the generator path requires them.

PHP ZIP must be enabled for XLSX workflows.

---
