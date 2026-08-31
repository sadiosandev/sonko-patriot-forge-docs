# 22. Configuration reference

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
