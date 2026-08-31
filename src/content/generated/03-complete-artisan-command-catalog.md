# 3. Complete Artisan command catalog

### `spforge:api`

```bash
php artisan spforge:api Model [options]
```

Generates a full CRUD API. Depending on options/config it can generate:

- migration
- model
- repository
- factory
- seeder
- enums
- Laravel Data DTO
- policy
- permission seeder
- observer
- Excel import/export
- queue jobs
- broadcast events
- notifications
- API requests
- API controller
- API routes
- tests
- Resource / ResourceCollection
- OpenAPI attributes/specification

Example:

```bash
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

### `spforge:api-scaffold`

```bash
php artisan spforge:api-scaffold Product [options]
```

Generates both API and web scaffold layers for a model.

### `spforge:scaffold`

```bash
php artisan spforge:scaffold Product [options]
```

Generates the web CRUD scaffold: requests, controller, views, routes and menu integration according to configuration.

### `spforge:model`

```bash
php artisan spforge:model Product [options]
```

Generates the model portion using the same field input mechanisms and modern Laravel 13 model conventions.

### `spforge:migration`

```bash
php artisan spforge:migration Product [options]
```

Generates a migration from supplied fields unless `--fromTable` is used.

### `spforge:repository`

```bash
php artisan spforge:repository Product [options]
```

Generates the repository layer.

### `spforge:api:controller`

```bash
php artisan spforge:api:controller Product [options]
```

Generates only the API controller layer.

### `spforge:api:requests`

```bash
php artisan spforge:api:requests Product [options]
```

Generates create/update API Form Requests.

### `spforge:api:tests`

```bash
php artisan spforge:api:tests Product [options]
```

Generates API tests and repository tests when repository pattern is enabled.

### `spforge:scaffold:controller`

```bash
php artisan spforge:scaffold:controller Product [options]
```

Generates only the web scaffold controller.

### `spforge:scaffold:requests`

```bash
php artisan spforge:scaffold:requests Product [options]
```

Generates scaffold Form Requests.

### `spforge:scaffold:views`

```bash
php artisan spforge:scaffold:views Product [options]
```

Generates scaffold views. Use `--views=index,create,edit,show` to restrict the set.

### `spforge:publish`

```bash
php artisan spforge:publish
```

Publishes/initializes SPForge base application infrastructure.

Option:

```text
--localized    Localize published files
```

### `spforge:publish:user`

```bash
php artisan spforge:publish:user
```

Publishes the prebuilt Users CRUD: views, web route/menu, controller, repository when enabled, and create/update requests.

### `spforge:publish:tables`

```bash
php artisan spforge:publish:tables datatable
php artisan spforge:publish:tables livewire
```

Publishes table helper views for the configured scaffold template.

Required argument:

```text
type = datatable | livewire
```

### `spforge:permissions:install`

```bash
php artisan spforge:permissions:install [options]
```

Publishes/prepares Spatie Laravel Permission.

Options:

| Option | Effect |
|---|---|
| `--patch-user` | Add `HasRoles` to `App\Models\User` |
| `--migrate` | Run database migrations after publication |
| `--force` | Overwrite already published Permission resources |

Recommended:

```bash
php artisan spforge:permissions:install --patch-user --migrate
```

The patcher is designed to be idempotent and avoids duplicating the import/trait.

### `spforge:features:install`

```bash
php artisan spforge:features:install [options]
```

Publishes/installs the infrastructure needed by optional v0.6 modules.

Options:

| Option | Description |
|---|---|
| `--all` | Install/publish all optional SPForge features |
| `--permissions` | Publish Permission resources |
| `--patchUser` | Patch `App\Models\User` with `HasRoles` while installing permissions |
| `--activityLog` | Publish Activitylog config/migrations |
| `--media` | Publish Media Library config/migrations |
| `--scout` | Publish Laravel Scout configuration |
| `--excel` | Publish Laravel Excel configuration |
| `--reverb` | Run Reverb/broadcasting installation where available |
| `--notifications` | Create database notifications migration when needed |
| `--migrate` | Run migrations after publishing |

Install all:

```bash
php artisan spforge:features:install --all --migrate
```

Selective examples:

```bash
php artisan spforge:features:install --activityLog --media --migrate
php artisan spforge:features:install --permissions --patchUser --migrate
php artisan spforge:features:install --scout --excel
php artisan spforge:features:install --reverb --notifications --migrate
```

### `spforge:swagger`

```bash
php artisan spforge:swagger [options]
```

Scans configured OpenAPI paths and writes a specification.

Options:

| Option | Description |
|---|---|
| `--format=json` | Generate JSON (default) |
| `--format=yaml` | Generate YAML |
| `--output=PATH` | Override output file |

Examples:

```bash
php artisan spforge:swagger
php artisan spforge:swagger --format=yaml
php artisan spforge:swagger --output=public/docs/openapi.json
```

Default JSON output:

```text
storage/api-docs/openapi.json
```

### `spforge:rollback`

```bash
php artisan spforge:rollback Model type
```

Required type:

```text
api
scaffold
api_scaffold
```

Examples:

```bash
php artisan spforge:rollback Product api
php artisan spforge:rollback Product scaffold
php artisan spforge:rollback Product api_scaffold
```

It removes generated artifacts according to current generator configuration, including newer Data/Permission/Excel/Job/Event/Notification artifacts where applicable.

---
