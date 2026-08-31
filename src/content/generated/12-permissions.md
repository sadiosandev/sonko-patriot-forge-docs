# 12. Permissions

### Infrastructure

```bash
php artisan spforge:permissions:install --patch-user --migrate
```

or:

```bash
php artisan spforge:features:install --permissions --patchUser --migrate
```

### CRUD generation

```bash
php artisan spforge:api Product --permissions
```

Generated permission seeder path:

```text
database/seeders/Permissions/ProductPermissionSeeder.php
```

Default actions:

```text
viewAny
view
create
update
delete
restore
forceDelete
```

Names:

```text
products.viewAny
products.view
products.create
products.update
products.delete
products.restore
products.forceDelete
```

Policy methods call `$user->can(...)` / Laravel Gate authorization depending on generated layer.

---
