# 6. Interactive field syntax

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
