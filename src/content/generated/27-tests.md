# 27. Tests

Enable:

```bash
php artisan spforge:api Product --tests
```

Test locations:

```text
tests/APIs/
tests/Repositories/
```

The package dev stack uses Pest/Testbench; generated project tests should be adjusted to the consuming application's authentication/database strategy when necessary.

---
