# 5. Common generator options — exhaustive reference

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
