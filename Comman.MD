# Express Module Generator Setup

## Option 1: Quick Setup (Recommended)

### 1. Save the generator script

Save the `generate-module.js` file to your project root directory.

### 2. Make it executable (Optional - Unix/Mac)

```bash
chmod +x generate-module.js
```

### 3. Add to package.json scripts

```json
{
  "scripts": {
    "generate": "node generate-module.js",
    "gen": "node generate-module.js"
  }
}
```

### 4. Usage

```bash
# Using npm script
npm run generate user
npm run gen product

# Or directly with node
node generate-module.js order
```

---

## Option 2: Global CLI Tool

### 1. Create a bin directory

```bash
mkdir bin
mv generate-module.js bin/generate-module
```

### 2. Update package.json

```json
{
  "bin": {
    "generate-module": "./bin/generate-module"
  }
}
```

### 3. Link globally

```bash
npm link
```

### 4. Usage (from anywhere in your project)

```bash
generate-module user
generate-module product
```

---

## What Gets Generated

When you run: `npm run generate user`

```
src/
└── modules/
    └── user/
        ├── controllers/
        │   └── user.controller.js
        ├── services/
        │   └── user.service.js
        ├── repositories/
        │   └── user.repository.js
        ├── schemas/
        │   └── user.schema.js
        └── user.routes.js
```

---

## Example: Creating a "Product" Module

```bash
npm run generate product
```

This creates:

- **Controller**: Handles HTTP requests/responses
- **Service**: Contains business logic
- **Repository**: Database operations
- **Schema**: Mongoose schema definition
- **Routes**: API route definitions

Then in your `app.js`:

```javascript
const productRoutes = require("./modules/product/product.routes");
app.use("/api/product", productRoutes);
```

---

## Customization

### Modify the template

Edit the template variables in `generate-module.js`:

- `controllerTemplate`
- `serviceTemplate`
- `repositoryTemplate`
- `schemaTemplate`

### Change directory structure

Modify the `baseDir` and `dirs` variables to match your preferred structure.

### Add more files

Add entries to the `files` array to generate additional files like:

- Validation schemas
- DTOs
- Tests
- Interfaces (for TypeScript)

---

## TypeScript Version

If you need a TypeScript version, modify the templates to:

- Use `.ts` extensions
- Add proper type annotations
- Include interface definitions
- Export types

Example modification:

```javascript
const controllerTemplate = `import { Request, Response, NextFunction } from 'express';
import ${pascalName}Service from '../services/${moduleName}.service';

class ${pascalName}Controller {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    // ... rest of code
  }
}

export default new ${pascalName}Controller();
`;
```

---

## Pro Tips

1. **Naming conventions**: Use kebab-case for module names: `user-profile`, `order-item`
2. **Batch generation**: Create a shell script to generate multiple modules:
   ```bash
   #!/bin/bash
   npm run generate user
   npm run generate product
   npm run generate order
   ```
3. **Template library**: Keep multiple template sets for different types of modules (auth, CRUD, etc.)
