# Dolicious E-Commerce

Dolicious is a full-stack e-commerce application built for browsing products, managing a cart, checking out, and administering product data. The project includes a modern Next.js frontend, a Spring Boot REST API, MySQL persistence, Cloudinary image handling, and Flyway-managed database migrations.

## Live Deployments

| Branch / App | Purpose | URL |
| --- | --- | --- |
| `main` / Dolicious | Current custom e-commerce application | https://dolicious.vercel.app |
| `clothingstore` | Initial instructor-provided frontend | https://clothingstore-eosin.vercel.app |

## Tech Stack

### Frontend

- Next.js 16, React 19, TypeScript
- Tailwind CSS, Radix UI, shadcn-style components
- Redux Toolkit for client state
- TanStack React Query for server state
- Axios for API requests
- Cloudinary via `next-cloudinary` for product images and uploads
- Hosted on Vercel

### Backend

- Java / Spring Boot
- Spring Web MVC, Spring Security, JWT authentication
- Spring Data JPA / Hibernate
- MySQL database hosted on Clever Cloud
- Flyway for database migrations
- OpenAPI / Swagger documentation
- Dockerized API deployment on Render

## Project Structure

```text
.
|-- client/                         # Next.js frontend
|   |-- src/app/                    # App Router pages
|   |-- src/api/                    # API client modules
|   |-- src/components/             # UI, forms, cards, layouts
|   |-- src/hooks/                  # React Query hooks
|   `-- src/models/                 # Shared frontend types
|-- server/                         # Spring Boot backend
|   |-- src/main/java/org/yearup/   # Controllers, services, repositories, models
|   |-- src/main/resources/db/migration/
|   |   |-- V1__create_tables.sql
|   |   |-- V2__seed_data.sql
|   |   `-- V3__create_option_related_tables.sql
|   |-- Dockerfile
|   |-- openapi.yaml
|   `-- pom.xml
`-- vercel.json
```

## Core Features

- Product catalog with categories, featured items, pricing, stock, and images
- Product images served from Cloudinary
- User registration, login, JWT access tokens, and token refresh handling
- Profile management
- Shopping cart and checkout flow
- Order creation and order management
- Admin pages for products, categories, and option groups
- API documentation through Swagger / OpenAPI
- Versioned database schema and seed data through Flyway migrations

## Local Development

### Prerequisites

- Node.js and pnpm
- Java 17 or newer
- Maven wrapper included in `server/`
- MySQL database credentials, either local or from Clever Cloud
- Cloudinary account with an upload preset named `ecommerce`

### Backend Setup

Create `server/.env.properties`:

```properties
DB_HOST=your-mysql-host
DB_NAME=your-database-name
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000,https://dolicious.vercel.app
```

Run the API:

```bash
cd server
./mvnw spring-boot:run
```

The backend runs on `http://localhost:8080` by default. Swagger UI is available at:

```text
http://localhost:8080/swagger-ui.html
```

### Frontend Setup

Create `client/.env.local`:

```properties
NEXT_PUBLIC_BASE_URL=http://localhost:8080
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

Install dependencies and start the development server:

```bash
cd client
pnpm install
pnpm dev
```

The frontend runs on:

```text
http://localhost:3000
```

## Database Migrations

Flyway is the migration tool for this project. Migration files live in:

```text
server/src/main/resources/db/migration
```

Migrations run automatically when the Spring Boot application starts. Add new database changes as a new versioned file, for example:

```text
V4__add_new_table.sql
```

Avoid editing migrations that have already been applied to shared or production databases.

## Deployment

### Frontend: Vercel

The Next.js frontend is deployed on Vercel. Configure the project with `client/` as the frontend app directory and set:

```properties
NEXT_PUBLIC_BASE_URL=https://your-render-api-url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

Production app:

```text
https://dolicious.vercel.app
```

### Backend: Render

The Spring Boot API is deployed on Render using `server/Dockerfile`. Render should be configured with the backend environment variables:

```properties
DB_HOST=your-clever-cloud-host
DB_NAME=your-clever-cloud-database-name
DB_USERNAME=your-clever-cloud-username
DB_PASSWORD=your-clever-cloud-password
APP_CORS_ALLOWED_ORIGINS=https://dolicious.vercel.app,https://clothingstore-eosin.vercel.app
```

### Database: Clever Cloud

Clever Cloud provides the MySQL database. The Clever Cloud host, database name, username, and password should be supplied to Render as environment variables. Flyway will apply the schema and seed migrations when the API starts.

### Images: Cloudinary

Cloudinary stores and serves product images. The frontend uses:

- `CldImage` to render product images
- `CldUploadWidget` to upload product images
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` for the Cloudinary cloud name
- Upload preset: `ecommerce`

## Useful Commands

```bash
# Frontend
cd client
pnpm dev
pnpm build
pnpm lint

# Backend
cd server
./mvnw spring-boot:run
./mvnw test
./mvnw clean package
```

## API Resources

- OpenAPI spec: `server/openapi.yaml`
- Static OpenAPI spec: `server/src/main/resources/static/openapi.yaml`
- Insomnia collection: `server/insomnia-collection.yaml`

## Notes

- Keep secrets out of source control. Use local `.env` files for development and platform environment variables for Render and Vercel.
- Include every deployed frontend origin in `APP_CORS_ALLOWED_ORIGINS`.
- Use Flyway migrations for schema or seed data changes instead of manual production database edits.
