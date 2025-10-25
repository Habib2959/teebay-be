# Teebay Backend

A full-stack product renting and buying/selling application backend built with Node.js, Express, GraphQL, Prisma ORM, and PostgreSQL.

## 📋 Project Description

Teebay is a platform where users can:

- **Buy/Sell Products**: List products for sale or purchase from other users
- **Rent Products**: Rent items from other users for a specified duration
- **Manage Transactions**: Track buying, selling, and rental transactions
- **Manage User Profiles**: Update personal information and manage account settings

## ✨ Features

- **GraphQL API**: Modern API using Apollo Server and Express
- **User Authentication**: Secure registration and login with JWT tokens
- **User Profiles**: Store email, phone, firstname, lastname, and address
- **Product Management**: Create, update, delete, and browse products
- **Transaction Tracking**: Track all buying, selling, and rental activities
- **Database**: PostgreSQL with Prisma ORM for type-safe database access
- **Type Safety**: Full TypeScript support
- **Database Migrations**: Automatic migration management with Prisma
- **CORS Enabled**: Supports cross-origin requests from frontend

## 🛠️ Prerequisites

- **Node.js**: v20 or higher
- **npm** or **yarn**
- **PostgreSQL**: v15 or higher (for local development)
- **Docker & Docker Compose**: For containerized development

## 📁 Project Structure

```
teebay-be/
├── src/
│   ├── index.ts                    # Main application entry point
│   ├── config/
│   │   ├── database.ts            # Database connection configuration
│   │   └── env.ts                 # Environment variables
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.resolver.ts  # Auth GraphQL resolvers
│   │   │   ├── auth.service.ts   # Auth business logic
│   │   │   └── auth.types.ts     # Auth TypeScript types
│   │   ├── user/
│   │   │   ├── user.resolver.ts  # User GraphQL resolvers
│   │   │   ├── user.service.ts   # User business logic
│   │   │   └── user.types.ts     # User TypeScript types
│   │   ├── product/
│   │   │   ├── product.resolver.ts  # Product GraphQL resolvers
│   │   │   ├── product.service.ts   # Product business logic
│   │   │   └── product.types.ts     # Product TypeScript types
│   │   └── transaction/
│   │       ├── transaction.resolver.ts  # Transaction GraphQL resolvers
│   │       ├── transaction.service.ts   # Transaction business logic
│   │       └── transaction.types.ts     # Transaction TypeScript types
│   ├── graphql/
│   │   ├── schema.ts              # GraphQL schema generator
│   │   ├── typeDefs.ts            # GraphQL type definitions
│   │   ├── resolvers.ts           # Main resolver registry
│   │   ├── common.types.ts        # Common GraphQL types
│   │   └── resolvers/
│   │       └── index.ts           # Resolver exports
│   ├── middleware/
│   │   └── auth.ts                # JWT authentication middleware
│   ├── services/
│   │   ├── auth.service.ts        # Shared auth services
│   │   └── user.service.ts        # Shared user services
│   ├── types/
│   │   └── context.ts             # GraphQL context type definition
│   └── utils/
│       ├── errors.ts              # Error handling utilities
│       ├── jwt.ts                 # JWT token utilities
│       └── password.ts            # Password hashing utilities
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Database seed script
│   └── migrations/                # Database migration files
├── Dockerfile                     # Production Docker image
├── Dockerfile.dev                 # Development Docker image
├── docker-compose.yml             # Docker composition for services
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🚀 Quick Start

### Local Development (Without Docker)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://teebay_user:teebay_password@localhost:5432/teebay_db"
   JWT_SECRET="your-secret-key-change-in-production"
   JWT_EXPIRY="7d"
   NODE_ENV="development"
   PORT=4000
   ```

3. **Setup Database**

   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server will be available at `http://localhost:4000/graphql`

### Docker Development

1. **Start all services**

   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Node.js backend on port 4000

2. **View logs**

   ```bash
   docker-compose logs -f app
   ```

3. **Stop services**

   ```bash
   docker-compose down
   ```

4. **Rebuild containers**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

## Installation

1. **Clone the repository**

   ```bash
   cd teebay-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/teebay"
   JWT_SECRET="your-secret-key-here"
   JWT_EXPIRY="7d"
   NODE_ENV="development"
   PORT=4000
   ```

4. **Setup Database**

   ```bash
   npm run prisma:migrate
   ```

5. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

## Running the Application

**Development Mode**

```bash
npm run dev
```

**Production Mode**

```bash
npm run build
npm run start
```

## Environment Variables

| Variable       | Description                          | Default       |
| -------------- | ------------------------------------ | ------------- |
| `DATABASE_URL` | PostgreSQL connection string         | Required      |
| `JWT_SECRET`   | Secret key for JWT tokens            | Required      |
| `JWT_EXPIRY`   | JWT token expiration time            | `7d`          |
| `NODE_ENV`     | Environment (development/production) | `development` |
| `PORT`         | Server port                          | `4000`        |

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Run production build
- `npm run prisma:migrate` - Create and apply database migrations
- `npm run prisma:studio` - Open Prisma Studio to view database
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Best Practices Implemented

✅ **Feature-Based Architecture**: Each feature (auth, user, products) is self-contained
✅ **Type Safety**: Full TypeScript support with strict mode enabled
✅ **Database Migrations**: Version-controlled database schema changes
✅ **Authentication**: JWT-based authentication with bcrypt password hashing
✅ **Error Handling**: Comprehensive error handling and validation
✅ **Code Organization**: Clear separation of concerns (service, resolver, types)
✅ **Documentation**: Well-documented code, APIs, and architecture
✅ **Environment Configuration**: Secure environment variable management
✅ **GraphQL Best Practices**: Proper schema design and resolver organization

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Environment variables store sensitive data
- Input validation on all API endpoints
- CORS support for frontend communication

## Next Steps

1. Configure PostgreSQL database
2. Set environment variables
3. Run database migrations
4. Start the development server
5. Access GraphQL playground at `http://localhost:4000/graphql`

## License

ISC

## Support

For issues and questions, please refer to the documentation in the `docs/` directory.
