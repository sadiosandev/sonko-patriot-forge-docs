# 7. Generated architecture

A feature-rich API may produce:

```text
app/
├── Data/
│   └── ProductData.php
├── Enums/
│   └── ProductStatus.php
├── Events/
│   ├── ProductCreated.php
│   ├── ProductUpdated.php
│   └── ProductDeleted.php
├── Exports/
│   └── ProductsExport.php
├── Http/
│   ├── Controllers/API/ProductAPIController.php
│   ├── Requests/API/CreateProductAPIRequest.php
│   ├── Requests/API/UpdateProductAPIRequest.php
│   └── Resources/
│       ├── ProductResource.php
│       └── ProductCollection.php
├── Imports/
│   └── ProductsImport.php
├── Jobs/
│   ├── ImportProductsJob.php
│   └── ExportProductsJob.php
├── Models/Product.php
├── Notifications/
│   ├── ProductCreatedNotification.php
│   ├── ProductUpdatedNotification.php
│   └── ProductDeletedNotification.php
├── Observers/ProductObserver.php
├── Policies/ProductPolicy.php
└── Repositories/ProductRepository.php

database/
├── factories/ProductFactory.php
├── migrations/...
└── seeders/
    ├── ProductsTableSeeder.php
    └── Permissions/ProductPermissionSeeder.php

resources/model_schemas/Product.json
routes/api.php
tests/APIs/...
tests/Repositories/...
storage/api-docs/openapi.json
```

Exact output depends on options/config.

---
