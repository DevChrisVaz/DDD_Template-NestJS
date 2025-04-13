# 🧱 NestJS DDD Hexagonal Template

A boilerplate for building scalable and maintainable backend applications using **NestJS**, **Domain-Driven Design (DDD)**, and **Hexagonal Architecture (Ports & Adapters)**.

## 📐 Architecture Overview

This template follows the principles of **DDD** and **Hexagonal Architecture**, organizing code into:

- **Domain**: Business logic and domain models.
- **Application**: Use cases (services) coordinating domain logic.
- **Infrastructure**: External concerns (e.g., databases, APIs).
- **Interface (Adapters)**: Controllers, GraphQL resolvers, CLI commands, etc.

### ✅ Benefits

- Clear separation of concerns
- Testable and modular components
- Infrastructure-agnostic domain logic
- Scalable codebase for complex systems

---

## 📁 Folder Structure

src/ ├── domain/ │ ├── models/ │ ├── repositories/ │ └── services/ ├── application/ │ ├── use-cases/ │ └── dto/ ├── infrastructure/ │ ├── database/ │ ├── services/ │ └── config/ ├── interfaces/ │ ├── http/ │ └── graphql/ ├── shared/ │ └── utils/ └── main.ts

### Layer Explanation

| Layer            | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `domain`         | Pure business logic — entities, aggregates, services. |
| `application`    | Coordinates domain logic with use cases.              |
| `infrastructure` | External tools (DB, cache, APIs).                     |
| `interfaces`     | Input/output adapters like REST, GraphQL, CLI.        |
| `shared`         | Reusable utilities, base classes, constants, etc.     |

---

## 🚀 Getting Started

Prepare the project for commitlint:

pnpm husky init

# Add commit message linting to commit-msg hook

echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg

# Windows users should use ` to escape dollar signs

echo "pnpm dlx commitlint --edit `$1" > .husky/commit-msg

### ⚡ Comando para Hacer un Commit

Para hacer un commit, usa el siguiente comando:

````bash
pnpm commit

### Prerequisites

- Node.js v18+
- Yarn or npm
- Docker (optional for DB)

### Installation

```bash
git clone https://github.com/your-org/nestjs-ddd-hex-template.git
cd nestjs-ddd-hex-template
npm install

# development
npm run start:dev

# production
npm run build
npm run start:prod

npm run test

🧪 Technologies
NestJS

TypeScript

Jest for testing

Class-validator

[TypeORM / Prisma / Mongoose] (optional adapters)

⚙️ Configuration
Environment variables are managed via .env. See .env.example for required keys.

npm run start         # Run the app
npm run start:dev     # Run in watch mode
npm run test          # Run tests
npm run lint          # Lint the codebase
npm run build         # Compile to dist/
````
