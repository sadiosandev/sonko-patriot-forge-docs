# Native Scaffold Template Pack

The v0.6.2 scaffold engine is self-contained. The default template namespace is `sonkopatriot-forge`; external template packs remain supported via `config/sonkopatriot_forge.php`, but an unavailable namespace automatically falls back to the built-in Bootstrap 5 templates.

Configuration:

```php
'templates' => 'sonkopatriot-forge',
'scaffold_layout' => 'layouts.app',
```

The scaffold generator no longer requires the legacy AdminLTE template package. Menu generation is optional in practice: when `path.menu_file` does not exist, the generator logs a message and continues.
