# Teebay Backend

A full-stack product renting and buying/selling application backend built with Node.js, Express, GraphQL, Prisma ORM, and PostgreSQL.

## Features

- **User Authentication**: Registration and login with email/password
- **User Profiles**: Store email, phone, firstname, lastname, and address
- **GraphQL API**: Modern API using Apollo Server and Express
- **Database**: PostgreSQL with Prisma ORM for type-safe database access
- **Type Safety**: Full TypeScript support
- **Database Migrations**: Automatic migration management with Prisma

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

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

## Project Structure

The project uses a **feature-based architecture** where each feature (auth, user, products, etc.) is self-contained.

```
teebay-be/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── config/
│   │   ├── database.ts          # Database configuration
│   │   └── env.ts               # Environment variables
│   ├── features/                # Feature modules (auth, user, products, etc.)
│   │   ├── auth/
│   │   │   ├── auth.service.ts      # Authentication business logic
│   │   │   ├── auth.resolver.ts     # GraphQL resolvers
│   │   │   └── auth.types.ts        # GraphQL type definitions
│   │   ├── user/
│   │   │   ├── user.service.ts      # User operations
│   │   │   ├── user.resolver.ts     # GraphQL resolvers
│   │   │   └── user.types.ts        # GraphQL type definitions
│   │   └── index.ts                 # Feature exports
│   ├── graphql/
│   │   ├── schema.ts                # Combined GraphQL schema
│   │   └── resolvers/
│   │       └── index.ts             # Combined resolvers
│   ├── middleware/
│   │   └── auth.ts              # JWT authentication middleware
│   ├── utils/
│   │   ├── jwt.ts               # JWT utilities
│   │   ├── password.ts          # Password hashing utilities
│   │   └── errors.ts            # Error handling
│   └── types/
│       └── context.ts           # GraphQL context type
├── prisma/
│   ├── schema.prisma            # Prisma data model
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding script
├── docs/
│   ├── API.md                   # API documentation
│   ├── DATABASE.md              # Database schema documentation
│   ├── SETUP.md                 # Setup guide
│   └── FEATURE_STRUCTURE.md     # Feature architecture guide
├── .env.example                 # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## API Documentation

### Authentication Endpoints

#### Register User

```graphql
mutation RegisterUser(
  $email: String!
  $password: String!
  $firstName: String!
  $lastName: String!
  $phone: String!
  $address: String!
) {
  register(
    data: {
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      address: $address
    }
  ) {
    user {
      id
      email
      firstName
      lastName
    }
    token
  }
}
```

#### Login User

```graphql
mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      firstName
      lastName
    }
    token
  }
}
```

## Database Schema

See [DATABASE.md](./docs/DATABASE.md) for detailed database schema documentation.

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
