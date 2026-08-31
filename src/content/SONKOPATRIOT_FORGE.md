# SonkoPatriot Forge — Complete Reference

## 1. Overview

**SonkoPatriot Forge (SPForge)** is a Laravel 13 native API/module generator focused on generating a complete, production-oriented application layer from Artisan.

Technical identity:

```text
Product       SonkoPatriot Forge
Short name    SPForge
Composer      sadio-sanghare/sonko-patriot-forge
PHP namespace SonkoPatriotForge
Artisan       spforge:*
Config        config/sonkopatriot_forge.php
Views         sonkopatriot-forge::
Laravel       13.x
PHP           8.3+
```

SPForge combines Laravel 13 native conventions with:

- Eloquent PHP Attributes
- implicit route-model binding
- Form Request validation
- API Resources / ResourceCollections
- Repository Pattern (optional)
- Laravel Data DTOs
- Spatie Query Builder
- Spatie Permission
- Policies / Observers
- PHP Enums / casts
- OpenAPI / Swagger UI
- Spatie Activitylog
- Spatie Media Library
- Laravel Scout
- Laravel Excel
- Laravel queues
- Laravel Reverb broadcasting
- Laravel Notifications
- Pest/API tests

---

## 2. Installation

### 2.1 Local path repository

Recommended during SPForge development:

```text
<laravel-project>/packages/sonkopatriot/forge
```

Application `composer.json`:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "packages/sonkopatriot/forge",
            "options": {
                "symlink": true
            }
        }
    ]
}
```

Install:

```bash
composer require "sadio-sanghare/sonko-patriot-forge:@dev"
```

Verify:

```bash
composer show sadio-sanghare/sonko-patriot-forge
php artisan list spforge
```

### 2.2 Publish configuration

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-config
```

Generated file:

```text
config/sonkopatriot_forge.php
```

Optional template publication:

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-templates
```

Optional Swagger UI view publication:

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-swagger-ui
```

### 2.3 Initialize application support files

```bash
php artisan spforge:publish
```

It initializes/updates the API route infrastructure and package base artifacts such as:

- `routes/api.php`
- Laravel 13 `bootstrap/app.php` API route registration when required
- `AppBaseController`
- test support files
- `BaseRepository` when repository pattern is enabled
- API JSON exception behavior / API-first routing support where handled by the publisher

Localized publication:

```bash
php artisan spforge:publish --localized
```

---

## 3. Complete Artisan command catalog

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

## 4. Common generator arguments

Most generation commands derived from the base command require:

```text
model    Singular Model name
```

Example:

```bash
php artisan spforge:api Customer
```

---

## 5. Common generator options — exhaustive reference

### Field source and schema

#### `--fieldsFile=FILE`

Read field definitions from a JSON schema file.

```bash
php artisan spforge:api Product --fieldsFile=Product.json
```

SPForge searches the supplied path, the project-relative path, then the configured schema directory.

#### `--jsonFromGUI=JSON`

Pass a complete JSON generator payload as a command option. Intended for GUI integrations.

#### `--plural=NAME`

Override generated plural naming.

#### `--table=TABLE`

Override database table name.


> `--table` always means the SQL/database table name on generator commands. It is intentionally not reused for the web table engine.

#### `--tableDriver=DRIVER`

Override the table engine for a generated web scaffold without changing the global dashboard configuration.

Allowed values:

```text
bootstrap
yajra-laravel-datatables
```


### Yajra Blade generation note

SPForge preserves Yajra runtime expressions such as `{!! $dataTable->table(...) !!}` and `{!! $dataTable->scripts() !!}` in the generated Blade view. These expressions are evaluated only when Laravel renders the scaffold page, never while the generator is creating the files.

Examples:

```bash
php artisan spforge:scaffold Article --tableDriver=bootstrap
php artisan spforge:api-scaffold Article --tableDriver=yajra-laravel-datatables
```

The configured default comes from `sonkopatriot_forge.web_dashboard.table_driver`.

#### `--fromTable`

Reverse-engineer fields from an existing table.

```bash
php artisan spforge:api Customer --fromTable --table=customers
```

#### `--ignoreFields=a,b,c`

Ignore selected fields while reading an existing table.

#### `--primary=FIELD`

Set custom primary key name.

#### `--connection=NAME`

Use a specific database connection.

#### `--relations`

Prompt for relationships after each field.

### Generation selection

#### `--prefix=PREFIX`

Apply a generator prefix.

#### `--skip=LIST`

Comma-separated artifacts to skip.

Supported values in the current base command:

```text
migration
model
controllers
api_controller
scaffold_controller
repository
requests
api_requests
scaffold_requests
routes
api_routes
scaffold_routes
views
tests
menu
dump-autoload
```

Example:

```bash
php artisan spforge:api Product --skip=migration,repository,tests
```

#### `--views=LIST`

Generate only selected scaffold views:

```text
index,create,edit,show
```

#### `--forceMigrate`

Run the generated migration automatically.

### Core generated artifacts

#### `--factory`

Generate model factory.

#### `--seeder`

Generate database seeder.

#### `--tests`

Generate Pest/API/repository tests according to enabled layers.

#### `--resources`

Generate API Resource.

#### `--resourceCollection`

Generate dedicated ResourceCollection.

#### `--policy`

Generate policy and bind it to the model with Laravel 13 `#[UsePolicy]`.

#### `--observer`

Generate observer and bind it using `#[ObservedBy]`.

#### `--softDelete`

Enable `SoftDeletes` on the generated model/migration.

#### `--noRepository`

Disable Repository Pattern and generate direct Eloquent controller logic.

### Laravel 13 behavior

#### `--middleware=NAME`

Repeatable controller-level middleware attribute.

```bash
php artisan spforge:api Product --middleware=auth:sanctum --middleware=throttle:api
```

Generates Laravel 13 Attributes such as:

```php
#[Middleware('auth:sanctum')]
#[Middleware('throttle:api')]
```

More advanced `only` / `except` forms can be defined globally through `controller_middleware` configuration.

#### `--noRouteModelBinding`

Disable implicit route-model binding.

#### `--noPagination`

Return non-paginated index data.

#### `--perPage=N`

Default generated page size.

SPForge still constrains request-supplied `per_page` values in generated controllers.

#### `--noEnumCasts`

Disable PHP backed enum generation/casts for enum database fields.

### OpenAPI

#### `--swagger`

Generate OpenAPI PHP Attributes and rebuild the specification after generation.

### Laravel Data

#### `--data`

Explicitly enable Data DTO generation.

#### `--noData`

Disable Data DTO generation even when enabled globally.

### Query Builder

#### `--queryBuilder`

Enable Spatie Query Builder in generated index endpoints.

#### `--noQueryBuilder`

Disable it.

### Permission

#### `--permissions`

Generate CRUD permissions and a permission-aware Policy.

#### `--permissionGuard=GUARD`

Override permission guard. Default: `web`.

### Enterprise

#### `--enterprise`

Enables the complete SonkoPatriot Forge v0.6 enterprise stack in a single command.

This preset is intended as a convenience switch. Infrastructure publication should still be performed with `spforge:features:install`.

### Activitylog

#### `--activityLog`

Adds Spatie Activitylog support to the generated Model.

### Media Library

#### `--media`

Adds Media Library integration and API media endpoints.

#### `--mediaCollection=NAME`

Default media collection. Config default: `default`.

#### `--mediaDisk=DISK`

Media filesystem disk. If omitted, Media Library/default filesystem behavior applies.

### Scout

#### `--searchable`

Adds Laravel Scout `Searchable` behavior and a search endpoint.

### Excel

#### `--excel`

Generates Import/Export classes and API endpoints.

### Queue

#### `--queue`

Generates queued Excel jobs / queued realtime artifacts when supported by enabled modules.

#### `--queueConnection=NAME`

Queue connection for generated Jobs.

#### `--queueName=NAME`

Queue name. Config default: `default`.

### Broadcasting

#### `--broadcast`

Generates Reverb-compatible lifecycle broadcast events.

#### `--broadcastChannelPrefix=PREFIX`

Broadcast channel prefix. Config default: `models`.

### Notifications

#### `--notifications`

Generates lifecycle Notification classes.

#### `--notify=CHANNEL`

Repeatable notification channel option.

```bash
php artisan spforge:api Product --notifications --notify=database --notify=mail --notify=broadcast
```

---

## 6. Interactive field syntax

SPForge prompts:

```text
Field: (name db_type html_type options)
Enter validations:
```

Minimal syntax:

```text
name string
```

The HTML type is optional.

Examples:

```text
name string
required|string|max:255

description text
nullable|string

price decimal
required|numeric|min:0

quantity integer
required|integer|min:0

active boolean
required|boolean

status enum:pending,active,archived
required
```

Enter `exit` or submit an empty field to finish.

SPForge automatically adds the primary key and timestamps unless configuration/options say otherwise.

---

## 7. Generated architecture

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

## 8. Laravel 13 model conventions

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

## 9. API behavior

### Form Request validation

Rules are generated into Form Requests rather than a legacy static `Model::$rules` property.

Controllers use:

```php
$request->validated()
```

### Route model binding

Enabled by default:

```php
public function show(Product $product): JsonResponse
```

Disable with `--noRouteModelBinding`.

### Pagination

Enabled by default. Generated controllers use the configured `per_page` default and accept a bounded `?per_page=` request value.

Disable with `--noPagination`.

### API JSON errors / Sanctum

SPForge's Laravel 13 publication flow is designed for API-first behavior so unauthenticated `/api/*` requests return JSON instead of attempting to resolve a missing `login` route.

For generated controllers:

```php
#[Middleware('auth:sanctum')]
```

is the native Laravel 13 controller Attribute form.

---

## 10. Spatie Query Builder

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

## 11. Laravel Data DTOs

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

## 12. Permissions

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

## 13. Activitylog

Enable:

```bash
php artisan spforge:api Product --activityLog
```

Install infrastructure:

```bash
php artisan spforge:features:install --activityLog --migrate
```

Config defaults:

```php
'activity_log' => false,
'activity_log_only_dirty' => true,
```

Generated Model integrates `LogsActivity` and an activity log options method.

---

## 14. Media Library

Enable:

```bash
php artisan spforge:api Product --media --mediaCollection=images --mediaDisk=public
```

Install:

```bash
php artisan spforge:features:install --media --migrate
```

Typical generated endpoints:

```text
POST   /api/products/{product}/media
DELETE /api/products/{product}/media/{media}
```

Model integration includes `HasMedia` / `InteractsWithMedia` and collection registration.

Default configuration:

```php
'media' => false,
'media_collection' => 'default',
'media_disk' => null,
```

---

## 15. Laravel Scout

Enable:

```bash
php artisan spforge:api Product --searchable
```

Publish Scout config:

```bash
php artisan spforge:features:install --scout
```

Generated model uses `Laravel\Scout\Searchable` and exposes searchable data.

Typical API:

```text
GET /api/products/search?q=phone
```

The actual search backend is configured through Laravel Scout (`database`, Algolia, Meilisearch, Typesense, etc. according to your app setup).

---

## 16. Laravel Excel

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

## 17. Queue support

Options:

```text
--queue
--queueConnection=NAME
--queueName=NAME
```

Defaults:

```php
'queue' => false,
'queue_connection' => null,
'queue_name' => 'default',
```

Horizon is optional. SPForge does not require it because Horizon is best suited to Linux/Redis environments and is not a portable requirement for Windows development.

---

## 18. Reverb / broadcasting

Install broadcasting:

```bash
php artisan spforge:features:install --reverb
```

Enable generated lifecycle broadcasts:

```bash
php artisan spforge:api Product --broadcast
```

Custom channel prefix:

```bash
php artisan spforge:api Product --broadcast --broadcastChannelPrefix=catalog
```

Generated lifecycle events may include:

```text
ProductCreated
ProductUpdated
ProductDeleted
```

Broadcasting or notifications may require an Observer; SPForge enables/generates the relevant lifecycle integration when needed.

---

## 19. Notifications

Enable:

```bash
php artisan spforge:api Product --notifications
```

Select channels:

```bash
php artisan spforge:api Product \
    --notifications \
    --notify=database \
    --notify=mail \
    --notify=broadcast
```

Install database notifications table:

```bash
php artisan spforge:features:install --notifications --migrate
```

Generated notification classes correspond to model lifecycle events.

---

## 20. Swagger / OpenAPI

### Configuration

```php
'options' => [
    'swagger' => true,
    'swagger_output' => storage_path('api-docs/openapi.json'),
    'swagger_title' => env('APP_NAME', 'Laravel').' API',
    'swagger_version' => '1.0.0',
    'swagger_description' => 'Generated API documentation',
    'swagger_scan_paths' => [
        app_path('OpenApi'),
        app_path('Models'),
        app_path('Http/Controllers/API'),
    ],
]
```

SPForge deliberately avoids scanning all of `app/`, preventing unrelated optional classes from breaking OpenAPI generation.

### Generate

```bash
php artisan spforge:swagger
```

YAML:

```bash
php artisan spforge:swagger --format=yaml
```

Custom path:

```bash
php artisan spforge:swagger --output=public/docs/openapi.json
```

### Root definition

SPForge maintains:

```text
app/OpenApi/OpenApiSpec.php
```

with API metadata and a Bearer/Sanctum security scheme.

### Swagger UI

Defaults:

```text
UI   /api/documentation
Spec /api/documentation/openapi.json
```

Config:

```php
'swagger_ui_enabled' => true,
'swagger_ui_path' => 'api/documentation',
'swagger_ui_spec_path' => 'api/documentation/openapi.json',
'swagger_ui_middleware' => [],
'swagger_ui_persist_authorization' => true,
'swagger_ui_deep_linking' => true,
'swagger_ui_display_request_duration' => true,
'swagger_ui_assets_url' => 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5',
```

Protect documentation in production by adding middleware, for example:

```php
'swagger_ui_middleware' => ['auth:sanctum'],
```

---

## 21. Enterprise preset

Command:

```bash
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

Intended capability set:

```text
Laravel Data
Spatie Query Builder
Permission / Policy
Observer
Factory
Seeder
Tests
Resources
ResourceCollection
Swagger
Activitylog
Media Library
Scout
Excel
Queue
Broadcasting
Notifications
```

Install infrastructure first or once per application:

```bash
php artisan spforge:features:install --all --migrate
```

Then generate enterprise modules repeatedly.

---

## 22. Configuration reference

File:

```text
config/sonkopatriot_forge.php
```

### Paths

```text
path.migration
path.model
path.datatables
path.livewire_tables
path.repository
path.routes
path.api_routes
path.request
path.api_request
path.controller
path.api_controller
path.api_resource
path.data
path.schema_files
path.seeder
path.database_seeder
path.factory
path.policy
path.observer
path.enum
path.permission_seeder
path.export
path.import
path.job
path.event
path.notification
path.view_provider
path.tests
path.repository_test
path.api_test
path.views
path.menu_file
```

### Namespaces

```text
namespace.model
namespace.datatables
namespace.livewire_tables
namespace.repository
namespace.controller
namespace.api_controller
namespace.api_resource
namespace.data
namespace.request
namespace.api_request
namespace.seeder
namespace.factory
namespace.policy
namespace.observer
namespace.enum
namespace.permission_seeder
namespace.export
namespace.import
namespace.job
namespace.event
namespace.notification
namespace.tests
namespace.repository_test
namespace.api_test
```

### Core options

```text
soft_delete
save_schema_file
localized
repository_pattern
resources
factory
seeder
data
query_builder
permissions
tests
laravel13_native
model_attributes
strict_types
route_model_binding
pagination
per_page
policy
observer
enum_casts
resource_collection
excluded_fields
```

### Enterprise options

```text
activity_log
activity_log_only_dirty
media
media_collection
media_disk
searchable
excel
queue
queue_connection
queue_name
broadcast
broadcast_channel_prefix
notifications
notification_channels
permission_guard
permission_actions
```

### Swagger options

```text
swagger
swagger_output
swagger_title
swagger_version
swagger_description
swagger_scan_paths
swagger_ui_enabled
swagger_ui_path
swagger_ui_spec_path
swagger_ui_middleware
swagger_ui_persist_authorization
swagger_ui_deep_linking
swagger_ui_display_request_duration
swagger_ui_assets_url
```

### Controller Attributes

```text
controller_middleware
controller_authorize
```

Example:

```php
'controller_middleware' => [
    'auth:sanctum',
    [
        'name' => 'throttle:api',
        'only' => ['index'],
    ],
],
```

### API prefix

```php
'api_prefix' => 'api',
```

### Timestamp configuration

```php
'timestamps' => [
    'enabled' => true,
    'created_at' => 'created_at',
    'updated_at' => 'updated_at',
    'deleted_at' => 'deleted_at',
],
```

---

## 23. Reverse generation from database

```bash
php artisan spforge:api Customer --fromTable --table=customers
```

With selected features:

```bash
php artisan spforge:api Customer \
    --fromTable \
    --table=customers \
    --ignoreFields=legacy_column \
    --resources \
    --queryBuilder \
    --swagger
```

`from_table.doctrine_mappings` can be customized for database types not mapped by default.

---

## 24. Repository Pattern vs direct Eloquent

Default:

```php
'repository_pattern' => true,
```

Generate without repository:

```bash
php artisan spforge:api Product --noRepository
```

This affects controller implementation and whether repository tests/base repository artifacts are required.

---

## 25. Resources and collections

Generate Resource:

```bash
php artisan spforge:api Product --resources
```

Generate Resource + dedicated collection:

```bash
php artisan spforge:api Product --resources --resourceCollection
```

When Data DTO generation is enabled, Resource mapping can use the generated Data object.

---

## 26. Enums

Enum casts are enabled by default:

```php
'enum_casts' => true,
```

For a database enum such as:

```text
status enum:active,inactive,suspended
```

SPForge can generate a PHP backed enum and cast the Model field to it.

Disable:

```bash
php artisan spforge:api Product --noEnumCasts
```

---

## 27. Tests

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

## 28. Schema files

When `save_schema_file=true`, SPForge saves JSON schemas to:

```text
resources/model_schemas/
```

A schema contains field metadata such as:

```text
name
dbType
htmlType
validations
searchable
fillable
primary
inForm
inIndex
inView
relations
```

Reuse:

```bash
php artisan spforge:api Product --fieldsFile=Product.json
```

---

## 29. Typical workflows

### Standard API

```bash
php artisan spforge:api Product \
    --resources \
    --factory \
    --tests \
    --middleware=auth:sanctum
```

### API with permissions

```bash
php artisan spforge:permissions:install --patch-user --migrate
php artisan spforge:api Product --permissions --resources --middleware=auth:sanctum
```

### Searchable audited API

```bash
php artisan spforge:features:install --activityLog --scout --migrate
php artisan spforge:api Product --activityLog --searchable --resources
```

### Media API

```bash
php artisan spforge:features:install --media --migrate
php artisan spforge:api Product --media --mediaCollection=images --resources
```

### Excel queued API

```bash
php artisan spforge:features:install --excel
php artisan spforge:api Customer --excel --queue --queueConnection=redis --queueName=imports
```

### Realtime API

```bash
php artisan spforge:features:install --reverb --notifications --migrate
php artisan spforge:api Product --broadcast --notifications --notify=database --notify=broadcast
```

### Full enterprise module

```bash
php artisan spforge:features:install --all --migrate
php artisan spforge:api Product --enterprise --middleware=auth:sanctum --perPage=100
```

---

## 30. Windows / Laragon notes

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

## 31. Troubleshooting

### Commands not visible

```bash
composer dump-autoload
php artisan optimize:clear
php artisan list spforge
```

### Config missing

```bash
php artisan vendor:publish --tag=sonkopatriot-forge-config
```

### Swagger generation

```bash
php artisan spforge:swagger
```

If scanning fails because of unrelated classes, verify:

```php
'swagger_scan_paths' => [
    app_path('OpenApi'),
    app_path('Models'),
    app_path('Http/Controllers/API'),
],
```

### Swagger UI routes

```bash
php artisan route:list --name=spforge.swagger
```

### Sanctum unauthenticated behavior

For API routes, ensure the application has run:

```bash
php artisan spforge:publish
```

and clear caches afterward.

### Permission model patch

```bash
php artisan spforge:permissions:install --patch-user
php -l app/Models/User.php
```

### Composer / vendor corruption

If PHP reports incompatible method signatures inside the same Symfony component, rebuild the affected vendor package or `vendor/` from `composer.lock` before continuing package operations.

---

## 32. Package dependencies

Runtime integrations currently declared by SPForge include:

```text
Laravel / Illuminate 13
Laravel Reverb
Laravel Scout
Laravel Excel
Spatie Activitylog
Spatie Laravel Data
Spatie Media Library
Spatie Permission
Spatie Query Builder
swagger-php
Symfony VarExporter
Laracasts Flash
```

Horizon is suggested, not required.

---

## 33. Package development / validation

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

## 34. License / upstream attribution

SonkoPatriot Forge is MIT licensed. Historical upstream copyright/attribution required by the original codebase remains preserved in the package `LICENSE` file.

## Native Scaffold Template Pack

The v0.6.2 scaffold engine is self-contained. The default template namespace is `sonkopatriot-forge`; external template packs remain supported via `config/sonkopatriot_forge.php`, but an unavailable namespace automatically falls back to the built-in Bootstrap 5 templates.

Configuration:

```php
'templates' => 'sonkopatriot-forge',
'scaffold_layout' => 'layouts.app',
```

The scaffold generator no longer requires the legacy AdminLTE template package. Menu generation is optional in practice: when `path.menu_file` does not exist, the generator logs a message and continues.

# Web Dashboard Kit

## `spforge:web:install`

Installs the modern SonkoPatriot Forge dashboard shell used by generated Blade scaffolds and selects the default web table engine.

```bash
php artisan spforge:web:install --table=bootstrap
```

or:

```bash
php artisan spforge:web:install --table=yajra-laravel-datatables
```

### Options

| Option | Description | Default |
|---|---|---|
| `--force` | Overwrite dashboard files already installed | false |
| `--path=` | Dashboard URL path | `dashboard` |
| `--middleware=` | Middleware protecting the dashboard route | `auth` |
| `--table=` | Dashboard table driver: `bootstrap` or `yajra-laravel-datatables` | `bootstrap` |

> Here `--table` belongs to `spforge:web:install` and selects the dashboard table engine. On model/scaffold generators, `--table` continues to mean the SQL table name; use `--tableDriver` to override the web table engine for one scaffold.

### Installed files

```text
resources/views/layouts/app.blade.php
resources/views/layouts/menu.blade.php
resources/views/layouts/partials/sidebar.blade.php
resources/views/layouts/partials/topbar.blade.php
resources/views/components/flash.blade.php
resources/views/dashboard/index.blade.php
public/vendor/spforge-dashboard/css/spforge-dashboard.css
public/vendor/spforge-dashboard/js/spforge-dashboard.js
```

It also appends the named `spforge.dashboard` route to `routes/web.php` and updates `config/sonkopatriot_forge.php`.

## Dashboard capabilities

The installed dashboard provides a reusable administration shell for every generated web scaffold:

- responsive Bootstrap 5 layout;
- collapsible sidebar and topbar;
- active-aware scaffold navigation;
- persistent light/dark theme using `localStorage`;
- configurable branding and colors;
- flash/validation message component;
- Chart.js-ready dashboard widgets;
- automatic menu insertion for generated scaffolds;
- support for Bootstrap tables and Yajra Laravel DataTables;
- `@stack('styles')` and `@stack('scripts')` extension points for module-specific assets.

## Customization

The dashboard is intentionally editable by the application developer. The main runtime settings live in `config/sonkopatriot_forge.php`:

```php
'web_dashboard' => [
    'enabled' => true,
    'path' => 'dashboard',
    'middleware' => 'auth',
    'table_driver' => 'bootstrap',
    'theme' => 'modern',
    'brand_name' => 'SonkoPatriot',
    'brand_suffix' => 'Forge',
    'logo' => null,
    'colors' => [
        'primary' => '#5b3df5',
        'sidebar' => '#07152e',
        'sidebar_secondary' => '#031124',
        'sidebar_accent' => '#5b3df5',
        'background' => '#f5f7fb',
    ],
],
```

### Branding and logo

Change the product identity without touching the package source:

```php
'brand_name' => 'My Company',
'brand_suffix' => 'Admin',
'logo' => 'images/logo.svg',
```

The generated Blade layout reads the published application configuration, so these values belong to your project and remain under your control.

### Colors

The dashboard exposes its main design tokens through configuration. For example:

```php
'colors' => [
    'primary' => '#5b3df5',
    'sidebar' => '#07152e',
    'sidebar_secondary' => '#031124',
    'sidebar_accent' => '#5b3df5',
    'background' => '#f5f7fb',
],
```

For deeper visual customization, edit the published stylesheet:

```text
public/vendor/spforge-dashboard/css/spforge-dashboard.css
```

and the dashboard Blade structure under:

```text
resources/views/layouts/
resources/views/dashboard/
```

### Sidebar and automatic menu

SPForge scaffolds append their navigation entries to:

```text
resources/views/layouts/menu.blade.php
```

A generated module keeps its web route names separate from API route names. For example:

```text
articles.index          -> /articles
api.articles.index      -> /api/articles
```

This keeps sidebar links predictable and avoids route-name collisions between Web and API scaffolds.

### Dark mode

The dashboard includes a theme toggle. The selected theme is stored in the browser under:

```text
spforge-theme
```

The JavaScript responsible for sidebar behavior, theme persistence and dashboard interactions is published to:

```text
public/vendor/spforge-dashboard/js/spforge-dashboard.js
```

### Route and middleware

The default dashboard route is named:

```text
spforge.dashboard
```

and points to `/dashboard`. Customize the URL and middleware at installation time:

```bash
php artisan spforge:web:install --path=backoffice --middleware=auth,verified --table=bootstrap
```

### Reinstalling after customization

Running `spforge:web:install` without `--force` preserves dashboard files that already exist. Use `--force` only when you intentionally want SPForge to overwrite the published dashboard/auth files:

```bash
php artisan spforge:web:install --force --table=bootstrap
```

> Keep application-specific customizations in the published project files and configuration. Package updates should not require editing files inside `vendor/`.

## Web table drivers

### `bootstrap`

This is the lightweight default. It generates Bootstrap 5 markup and uses Laravel pagination. No client-side DataTables library is required.

Generated flow:

```text
Browser -> Laravel controller -> Eloquent/Repository -> paginate() -> Blade Bootstrap table
```

Use it for standard back-office screens and small/medium result sets.

### `yajra-laravel-datatables`

This driver uses `yajra/laravel-datatables:^13.0`, the Laravel 13 compatible Yajra Laravel DataTables package. It provides server-side processing suitable for large datasets.

Generated flow:

```text
DataTables UI -> Ajax -> ArticleDataTable -> Eloquent query -> database
```

For a model such as `Article`, SPForge generates:

```text
app/DataTables/ArticleDataTable.php
resources/views/articles/table.blade.php
resources/views/articles/datatables_actions.blade.php
```

The generated DataTable service includes:

- Eloquent server-side processing;
- searchable/sortable columns;
- server-side pagination;
- state save;
- responsive Bootstrap 5 integration;
- configurable page length;
- generated View / Edit / Delete actions;
- support for custom primary keys via the generator configuration.

The generated page loads jQuery and DataTables 2.x Bootstrap 5/Responsive assets only when a Yajra table is actually used.

### Global selection

```php
'web_dashboard' => [
    'enabled' => true,
    'path' => 'dashboard',
    'middleware' => 'auth',
    'table_driver' => 'bootstrap',
    'theme' => 'modern',
],
```

Allowed values:

```text
bootstrap
yajra-laravel-datatables
```

### Per-module selection

```bash
php artisan spforge:scaffold Article --tableDriver=yajra-laravel-datatables
php artisan spforge:scaffold Category --tableDriver=bootstrap
```

The override is useful when most modules use Bootstrap tables but a high-volume module requires server-side DataTables.

### Recommended workflow

```bash
php artisan spforge:web:install --table=bootstrap
php artisan spforge:api-scaffold Article --tableDriver=yajra-laravel-datatables --permissions --activityLog --searchable --excel --middleware=auth
php artisan spforge:scaffold Category --tableDriver=bootstrap --permissions --middleware=auth
```

Each generated scaffold appends an active-aware link to `resources/views/layouts/menu.blade.php`.

Use `--skipWebCheck` only when the application supplies its own `layouts.app` and menu integration.

## Yajra Laravel DataTables dependency

SPForge v0.8 requires:

```json
"yajra/laravel-datatables": "^13.0"
```

This is the all-in-one Laravel DataTables package for Laravel 13. After upgrading SPForge, refresh Composer dependencies with:

```bash
composer update sadio-sanghare/sonko-patriot-forge yajra/laravel-datatables -W
```

## License

SonkoPatriot Forge is distributed under the MIT License with the copyright notices preserved in `LICENSE` for InfyOm Labs (2016) and SonkoPatriot Labs (2026).

# Web Authentication Kit (v0.9)

## Goal

`spforge:web:install --auth` installs a complete, native Laravel web authentication flow that visually matches the SonkoPatriot Forge dashboard. It does not depend on Breeze for pages or controllers.

The generated code uses Laravel's native authentication primitives:

- `Auth::attempt()` and session regeneration for login;
- `Registered` event for registration;
- `Password::sendResetLink()` for forgotten passwords;
- `Password::reset()` for reset links;
- `EmailVerificationRequest` and signed/throttled verification URLs;
- password confirmation sessions;
- `guest`, `auth`, `signed`, `verified` and `throttle` middleware.

## Installation commands

Dashboard + Auth + Bootstrap tables:

```bash
php artisan spforge:web:install --auth --table=bootstrap
```

Dashboard + Auth + Yajra Laravel DataTables:

```bash
php artisan spforge:web:install --auth --table=yajra-laravel-datatables
```

Dashboard requiring a verified email:

```bash
php artisan spforge:web:install --auth --middleware=auth,verified --table=yajra-laravel-datatables
```

Authentication without public registration:

```bash
php artisan spforge:web:install --auth --no-registration --table=bootstrap
```

Authentication without email verification:

```bash
php artisan spforge:web:install --auth --no-email-verification --table=bootstrap
```

Overwrite previously installed dashboard/auth files:

```bash
php artisan spforge:web:install --auth --force --table=yajra-laravel-datatables
```

## `spforge:web:install` options related to auth

| Option | Type | Purpose |
| --- | --- | --- |
| `--auth` | flag | Install all authentication controllers/routes/views/assets |
| `--no-registration` | flag | Disable registration routes/pages |
| `--no-email-verification` | flag | Disable verification routes and User `MustVerifyEmail` patch |
| `--path=PATH` | value | Dashboard route and default auth redirect destination |
| `--middleware=LIST` | value | Comma-separated dashboard middleware, for example `auth,verified` |
| `--force` | flag | Replace previously generated web/auth files |
| `--table=DRIVER` | value | `bootstrap` or `yajra-laravel-datatables` for generated scaffolds |

## Generated authentication files

```text
app/Http/Controllers/Auth/
├── AuthenticatedSessionController.php
├── ConfirmablePasswordController.php
├── EmailVerificationNotificationController.php
├── EmailVerificationPromptController.php
├── NewPasswordController.php
├── PasswordResetLinkController.php
├── RegisteredUserController.php
└── VerifyEmailController.php

resources/views/auth/
├── layouts/
│   └── guest.blade.php
├── confirm-password.blade.php
├── forgot-password.blade.php
├── login.blade.php
├── register.blade.php
├── reset-password.blade.php
└── verify-email.blade.php

routes/
└── spforge-auth.php

public/vendor/spforge-auth/css/
└── spforge-auth.css
```

`routes/web.php` receives only one registration line:

```php
require __DIR__.'/spforge-auth.php';
```

This keeps application routing easy to audit and customize.

## Authentication routes

| Method | URI | Name | Middleware |
| --- | --- | --- | --- |
| GET | `/login` | `login` | `guest` |
| POST | `/login` | `login.store` | `guest` |
| GET | `/register` | `register` | `guest`, if enabled |
| POST | `/register` | `register.store` | `guest`, if enabled |
| GET | `/forgot-password` | `password.request` | `guest` |
| POST | `/forgot-password` | `password.email` | `guest` |
| GET | `/reset-password/{token}` | `password.reset` | `guest` |
| POST | `/reset-password` | `password.store` | `guest` |
| GET | `/confirm-password` | `password.confirm` | `auth` |
| POST | `/confirm-password` | `password.confirm.store` | `auth` |
| GET | `/verify-email` | `verification.notice` | `auth`, if enabled |
| GET | `/verify-email/{id}/{hash}` | `verification.verify` | `auth`, `signed`, `throttle:6,1` |
| POST | `/email/verification-notification` | `verification.send` | `auth`, `throttle:6,1` |
| POST | `/logout` | `logout` | `auth` |

## Email verification

When verification is enabled, the installer safely updates `App\Models\User` to implement:

```php
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
```

The patch also recognizes and replaces the commented import present in the standard Laravel skeleton.

Use this dashboard middleware if only verified users should access the dashboard:

```bash
--middleware=auth,verified
```

## UI architecture

The auth UI is a responsive Bootstrap 5 design with:

- large gradient marketing panel on desktop;
- compact mobile branding;
- modern white auth card;
- configurable logo and colors;
- password reveal controls;
- inline validation errors;
- status/success notices;
- responsive registration form;
- verification and password-reset states;
- no fake social authentication routes.

## Customization

The generated controllers, routes, views and CSS are copied into the host application. They are intentionally developer-owned after installation.

Global design/behavior defaults live in:

```php
config/sonkopatriot_forge.php
```

### `web_auth`

```php
'web_auth' => [
    'enabled' => true,
    'registration' => true,
    'email_verification' => true,
    'remember_me' => true,
    'redirect_after_login' => '/dashboard',
    'redirect_after_verification' => '/dashboard',
    'redirect_after_password_confirmation' => '/dashboard',
    'brand_name' => 'SonkoPatriot',
    'brand_suffix' => 'Forge',
    'logo' => null,
    'show_marketing_panel' => true,
    'footer' => 'Secure by default · Powered by Laravel',
    'colors' => [
        'primary' => '#5b3df5',
        'primary_dark' => '#3922c7',
        'accent' => '#7c5cff',
        'panel' => '#11145a',
    ],
    'copy' => [
        'login_title' => 'Welcome back',
        'login_subtitle' => 'Sign in to your account to continue.',
        'register_title' => 'Create your account',
        'register_subtitle' => 'Fill in the details below to get started.',
    ],
    'marketing' => [
        'kicker' => 'Modern Laravel applications',
        'title' => "Build faster.\nShip smarter.",
        'description' => 'A clean authentication experience built for modern Laravel applications.',
        'features' => [
            'Secure authentication workflow',
            'Responsive Bootstrap 5 interface',
            'Developer-friendly customization',
        ],
    ],
],
```

### `web_dashboard`

Dashboard branding can be customized independently:

```php
'web_dashboard' => [
    'brand_name' => 'My Product',
    'brand_suffix' => 'Admin',
    'logo' => 'images/admin-logo.svg',
    'colors' => [
        'primary' => '#5b3df5',
        'sidebar' => '#07152e',
        'sidebar_secondary' => '#031124',
        'sidebar_accent' => '#5b3df5',
        'background' => '#f5f7fb',
    ],
],
```

Developers may also edit directly:

```text
resources/views/auth/**
public/vendor/spforge-auth/css/spforge-auth.css
resources/views/layouts/**
public/vendor/spforge-dashboard/**
```

Running `spforge:web:install --force` intentionally overwrites those generated customizations, so use `--force` only when a reset is desired.

### Scaffold template rendering safety

SPForge generates Blade source without executing your application layout during generation. Runtime directives such as `@extends`, `@section`, and dashboard components are preserved for the generated view and are only evaluated when the application serves the page.

## Scaffold field template pack

SonkoPatriot Forge resolves scaffold form inputs from its native template pack:

```text
sonkopatriot-forge::templates.scaffold.fields.*
```

Supported field templates include `text`, `textarea`, `select` / `enum`, `datetime-local`, `checkbox`, `number`, `email`, `password`, `date`, `time`, `url`, `tel`, `hidden`, and radio inputs.

This path is internal to the generator; generated applications do not need to publish these templates unless they want to customize them.


## Scaffold field template safety

SPForge uses a two-phase Blade generation strategy for scaffold form controls. Runtime directives such as `@error`, `@checked`, `@selected`, `@foreach` and runtime `{{ ... }}` expressions are protected while the generator renders its own templates, then restored in the generated application Blade files. This prevents Laravel from compiling runtime-only directives during code generation.

This applies to all native field templates: `text`, `textarea`, `select`, `enum`, `checkbox`, `radio`, `number`, `date`, `datetime-local`, `time`, `email`, `password`, `url`, `tel`, and `hidden`.

### Scaffold field rendering safety (v0.9.4)

SonkoPatriot Forge computes conditional HTML attributes such as `required` in PHP before rendering scaffold field stubs. Field generator templates do not use inline generator-time `@if/@endif` directives, preventing Blade double-compilation errors while preserving runtime directives such as `@error`, `@checked`, `@selected`, and `@foreach` in the generated application views.



### Safe scaffold menu generation (v0.9.5)

SPForge no longer renders a Blade template that itself contains nested Blade expressions when adding sidebar entries. Menu items are built directly as final Blade code and wrapped with deterministic markers such as:

```blade
{{-- SPForge menu: articles:start --}}
<a href="{{ route('articles.index') }}"
   class="spforge-nav-link {{ request()->routeIs('articles.*') ? 'active' : '' }}">
    <i class="bi bi-folder2-open"></i>
    <span>Articles</span>
</a>
{{-- SPForge menu: articles:end --}}
```

When regenerating the same scaffold, SPForge removes a legacy pre-v0.9.5 entry for that model before adding the safe marked version. This repairs malformed nested-Blade menu entries that could cause `Unclosed '(' does not match '}'` when opening the dashboard.

### Route naming (v0.9.6)

Web scaffold routes keep conventional names such as `articles.index`, while generated API routes always use the `api.` namespace such as `api.articles.index`. This prevents Web/API route-name collisions in `api-scaffold` modules. Scaffold Blade route expressions are emitted only for application runtime, avoiding nested Blade compilation errors.
