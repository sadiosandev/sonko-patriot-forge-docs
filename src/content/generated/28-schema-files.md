# 28. Schema files

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
