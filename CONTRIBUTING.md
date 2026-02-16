# Contributing to fastify-type-provider-yup

Thank you for your interest in contributing to fastify-type-provider-yup! We appreciate your time and effort in helping improve this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Running Tests](#running-tests)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/fastify-type-provider-yup.git
   cd fastify-type-provider-yup
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/jorgevrgs/fastify-type-provider-yup.git
   ```

## Development Setup

### Prerequisites

- **Node.js**: Version 20.x or 22.x (recommended: use the version specified in `.nvmrc` if present)
- **pnpm**: Version 10.x or higher
  ```bash
  npm install -g pnpm
  ```

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

3. Run tests to ensure everything is working:
   ```bash
   pnpm test
   ```

### Available Scripts

- `pnpm build` - Build the project using tsup (generates ESM + CJS + type declarations)
- `pnpm lint` - Check code style with Biome
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm format` - Format code with Biome
- `pnpm test` - Run all tests (JavaScript runtime + TypeScript type checking)
- `pnpm test:js` - Run JavaScript tests only
- `pnpm test:ts` - Run TypeScript type checking tests only
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage report
- `pnpm example:node` - Run Node.js example with nodemon
- `pnpm example:ts` - Run TypeScript example with ts-node

## How to Contribute

### Workflow

1. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

4. **Commit your changes** (pre-commit hooks will run automatically):
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Coding Standards

This project uses **Biome** for linting and formatting (not ESLint/Prettier).

### Code Style

- **Line width**: 80 characters
- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Line endings**: LF (Unix-style)
- **Semicolons**: Required
- **Trailing commas**: Where valid

### Pre-commit Hooks

Pre-commit hooks are automatically installed via Husky when you run `pnpm install`. These hooks will:

- Run Biome linting and formatting on staged files
- Prevent commits with linting errors

If you need to bypass hooks (not recommended), use:
```bash
git commit --no-verify
```

### TypeScript Guidelines

- Use strict TypeScript settings (already configured)
- Export types separately from implementations when appropriate
- Use `type` for type aliases, `interface` for object shapes that may be extended
- Avoid `any` types - use `unknown` instead and perform type guards

## Commit Messages

We follow **Conventional Commits** specification for clear and structured commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes or bug fixes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration files
- `chore`: Other changes that don't modify src or test files

### Examples

```bash
feat: add support for custom validation options
fix: resolve schema transformation for nested objects
docs: update README with Swagger integration example
test: add tests for serializer compiler edge cases
refactor: simplify resolveSchema utility function
```

### Breaking Changes

If your change introduces a breaking change, add `BREAKING CHANGE:` in the commit body:

```
feat: change validator compiler API

BREAKING CHANGE: validatorCompiler now requires options parameter
```

## Pull Request Process

1. **Update documentation** if you've changed APIs or added features
2. **Add tests** for new features or bug fixes
3. **Ensure all tests pass** and coverage thresholds are met (90%)
4. **Update examples** if your changes affect usage patterns
5. **Fill out the PR template** completely
6. **Link related issues** using GitHub keywords (e.g., "Fixes #123")

### PR Title Format

Use the same format as commit messages:
```
feat: add new feature
fix: resolve bug with validation
```

### Review Process

- Maintainers will review your PR within a few days
- Address any feedback or requested changes
- Once approved, a maintainer will merge your PR

## Running Tests

### Full Test Suite

```bash
pnpm test
```

This runs both JavaScript runtime tests and TypeScript type checking tests.

### Individual Test Commands

```bash
# Run only JavaScript tests
pnpm test:js

# Run only TypeScript type checking
pnpm test:ts

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:cov
```

### Coverage Requirements

All code changes must maintain or improve test coverage:
- **Statements**: 90%
- **Branches**: 90%
- **Functions**: 90%
- **Lines**: 90%

### Writing Tests

- Place tests in the `test/` directory
- Use `.test.ts` suffix for runtime tests
- Use `.test-d.ts` suffix for type checking tests
- Follow existing test patterns
- Test both success and error cases

## Reporting Bugs

Before creating a bug report, please:

1. **Check existing issues** to avoid duplicates
2. **Test with the latest version** of the package
3. **Gather information**:
   - Node.js version
   - Fastify version
   - Yup version
   - Steps to reproduce
   - Expected vs actual behavior
   - Code sample (minimal reproduction)

Create a bug report using our [Bug Report Template](https://github.com/jorgevrgs/fastify-type-provider-yup/issues/new?template=bug_report.yml).

## Suggesting Features

We welcome feature suggestions! Before creating a feature request:

1. **Check existing issues** for similar requests
2. **Consider the scope** - does it fit the project goals?
3. **Provide details**:
   - Use case and motivation
   - Proposed API or implementation
   - Examples of how it would be used
   - Any alternatives you've considered

Create a feature request using our [Feature Request Template](https://github.com/jorgevrgs/fastify-type-provider-yup/issues/new?template=feature_request.yml).

## Questions?

If you have questions about contributing, feel free to:

- Open a [Discussion](https://github.com/jorgevrgs/fastify-type-provider-yup/discussions)
- Ask in an issue
- Reach out to the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to fastify-type-provider-yup! 🎉
