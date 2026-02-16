# AI Assistant Guidelines

This file provides guidance to AI coding assistants (such as GitHub Copilot, Cursor, Claude Code, etc.) when working with code in this repository.

## Project Overview

This is a Yup type provider for Fastify v5 that enables automatic type inference and validation using Yup schemas. The package provides validator and serializer compilers that integrate Yup schemas with Fastify's type system, offering type-safe request/response handling with automatic validation and serialization.

## Build and Development Commands

### Building
```bash
pnpm build              # Build using tsup (ESM + CJS + type declarations)
```

### Testing
```bash
pnpm test               # Run all tests (JS runtime + TS typecheck)
pnpm test:js            # Run Vitest JavaScript tests only
pnpm test:ts            # Run Vitest typecheck tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage (90% threshold for all metrics)
```

### Linting and Formatting
```bash
pnpm lint               # Check code with Biome
pnpm lint:fix           # Auto-fix Biome issues
pnpm format             # Format code with Biome
```

### Examples
```bash
pnpm example:node       # Run Node.js example with nodemon
pnpm example:ts         # Run TypeScript example with ts-node
```

## Architecture

### Core Components

**Type Provider (`src/type-provider.ts`)**
- Exports `YupTypeProvider` interface that extends Fastify's `FastifyTypeProvider`
- Maps Yup `AnySchema` to `InferType<schema>` for both validator and serializer
- Enables `.withTypeProvider<YupTypeProvider>()` on Fastify instances
- Also exports `FastifyPluginCallbackYup` and `FastifyPluginAsyncYup` helper types

**Plugin (`src/plugin.ts`)**
- Main entry point via `yupPlugin` async function
- Accepts `YupPluginOptions` with optional `serializerCompilerOptions` and `validatorCompilerOptions`
- Creates and registers both validator and serializer compilers on the Fastify instance
- Wrapped as `fastifyYupPlugin` with fastify-plugin for encapsulation

**Compilers (`src/compilers/`)**
- `createValidatorCompiler`: Creates Fastify schema compiler that validates data using `schema.validateSync()`
- `createSerializerCompiler`: Creates serializer that validates response data and stringifies it
  - Uses `resolveSchema` helper to handle schemas wrapped in `{ properties: schema }` format
  - Throws `ResponseValidationError` on validation failures with method/url context

**JSON Schema Transformer (`src/json-transformer.ts`)**
- Converts Yup schemas to JSON Schema for OpenAPI/Swagger documentation
- Uses `@sodaru/yup-to-json-schema` for schema conversion
- Handles `body`, `params`, `querystring`, `headers`, and `response` schemas
- Supports `hide` option and URL-based skip list to exclude routes from documentation
- Export `createJsonSchemaTransformer` for custom options and `jsonSchemaTransformer` with defaults

**Utilities (`src/utils/`)**
- `resolveSchema`: Unwraps schemas from `{ properties: schema }` wrapper (Swagger compatibility)
- `safeParse`: Validates data against schema and returns success/error result

**Errors (`src/errors/`)**
- `ResponseValidationError`: Custom Fastify error for response validation failures using `@fastify/error`

### Module Structure

```
src/
├── index.ts                              # Main exports
├── plugin.ts                             # Plugin registration
├── type-provider.ts                      # TypeScript type provider interface
├── json-transformer.ts                   # Swagger/OpenAPI schema transformer
├── constants.ts                          # Default options
├── types.ts                              # TypeScript type definitions
├── compilers/
│   ├── create-validator.compiler.ts      # Request validation
│   └── create-serializer.compiler.ts     # Response serialization
├── errors/
│   ├── index.ts
│   └── response-validation.error.ts
└── utils/
    ├── index.ts
    ├── resolve-schema.util.ts
    └── safe-parse.util.ts
```

### Build Output

The project uses `tsup` to generate:
- ESM format: `dist/index.js` with types at `dist/index.d.ts`
- CJS format: `dist/index.cjs` with types at `dist/index.d.cts`
- Source maps and code splitting enabled

### Test Configuration

Tests use Vitest with:
- Coverage thresholds at 90% for statements, branches, functions, and lines
- Coverage includes all `src/**/*.ts` files
- Type checking tests in `test/**/*.test-d.ts` files
- Runtime tests in `test/**/*.test.ts` files

## Integration Patterns

### Plugin Registration (Automatic Setup)
```typescript
import { yupPlugin } from 'fastify-type-provider-yup';
fastify.register(yupPlugin, {
  validatorCompilerOptions: { abortEarly: false },
  serializerCompilerOptions: { stripUnknown: true }
});
```

### Manual Setup (More Control)
```typescript
import { validatorCompiler, serializerCompiler, YupTypeProvider } from 'fastify-type-provider-yup';
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
const typedFastify = fastify.withTypeProvider<YupTypeProvider>();
```

### Swagger Integration
Requires:
1. Calling `extendSchema({ addMethod, Schema })` from `@sodaru/yup-to-json-schema` before registering Swagger
2. Using `jsonSchemaTransformer` in Swagger plugin options via `transform` property
3. Registering routes inside `app.after()` callback to ensure transformer is registered

## Important Notes

- The project supports both ESM (`.mjs`) and CJS (`.cjs`) examples
- Biome is used for linting and formatting (not ESLint/Prettier)
- The package has peer dependencies on `fastify@^5.0.0` and `yup@^1.7.0`
- When working with Swagger, the `resolveSchema` utility handles nested `{ properties: schema }` format from Swagger transformations
- Pre-commit hooks are configured via Husky and will run automatically on commit
- All code changes must maintain 90% test coverage across all metrics
