
```md
# 🚀 Auto Abzar Test

## 🔧 TypeORM Migrations

Manage your database migrations using the following scripts:

- **Generate a New Migration**
  ```bash
  npm run typeorm:generate
  ```
  Generates a new migration file in `libs/shared/db/src/connection/migrations`.

- **Run Migrations**
  ```bash
  npm run typeorm:migrate
  ```
  Applies all pending migrations to the database using the configured data source.

- **Revert Last Migration**
  ```bash
  npm run typeorm:revert
  ```
  Rolls back the most recent migration.

---

## 🧩 NX Workspace Commands

- **Serve the API Locally**
  ```bash
  nx run api:serve
  ```
  Runs the API in development mode.

- **Build the Entire Workspace**
  ```bash
  nx run build
  ```
  Compiles all apps and libraries in the workspace.

---

## 📁 Project Structure

- **Migrations:** `libs/shared/db/src/connection/migrations`
- **Data Source:** `libs/shared/db/src/connection/data-source.ts`

---

## 📁 Postman doc is in root folder

