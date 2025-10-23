# Teebay Backend - Complete Project Guide

## 🎯 Project Status: READY FOR DEVELOPMENT

The Teebay Backend project has been fully set up with:

- ✅ Feature-based architecture
- ✅ GraphQL API with Apollo Server
- ✅ PostgreSQL + Prisma ORM
- ✅ JWT Authentication
- ✅ Complete documentation

---

## 📋 Quick Reference

| What                  | How                                               | Where                     |
| --------------------- | ------------------------------------------------- | ------------------------- |
| **Start Development** | `npm install && npm run dev`                      | `src/index.ts`            |
| **Add New Feature**   | Create folder `src/features/{name}/` with 3 files | `docs/ARCHITECTURE.md`    |
| **Test API**          | Go to `http://localhost:4000/graphql`             | Apollo GraphQL Playground |
| **Setup Database**    | `npm run prisma:migrate`                          | `prisma/schema.prisma`    |
| **View Database**     | `npm run prisma:studio`                           | `http://localhost:5555`   |
| **Check Migrations**  | Run `npm run prisma:migrate`                      | `prisma/migrations/`      |

---

## 🏗️ Architecture at a Glance

### Feature-Based Structure

```
src/features/
├── auth/          ← All authentication code
│   ├── auth.service.ts      (registerUser, loginUser)
│   ├── auth.resolver.ts     (GraphQL mutations)
│   └── auth.types.ts        (GraphQL schema)
│
├── user/          ← All user profile code
│   ├── user.service.ts      (getUserById, updateProfile)
│   ├── user.resolver.ts     (GraphQL queries/mutations)
│   └── user.types.ts        (GraphQL schema)
│
└── [Add more features here]
```

### Why This Structure?

✅ **Easy to Add Features** - Just create a new folder
✅ **Easy to Find Code** - All related code in one place
✅ **Easy to Remove Features** - Delete folder, update imports
✅ **Easy to Scale** - Grows naturally with your app

---

## 🔄 Data Flow

### Authentication Request Flow

```
┌─────────────────┐
│ Client Request  │ mutation RegisterUser { register(...) { user token } }
└────────┬────────┘
         │
┌────────▼────────────────────────┐
│ Express + GraphQL Middleware    │ Validates request format
└────────┬────────────────────────┘
         │
┌────────▼──────────────────┐
│ JWT Auth Middleware       │ Extracts bearer token (if present)
└────────┬──────────────────┘
         │
┌────────▼─────────────────────────┐
│ GraphQL Resolver                │ auth.resolver.ts → Mutation.register
└────────┬─────────────────────────┘
         │
┌────────▼──────────────────┐
│ Service Layer             │ auth.service.ts → registerUser()
├──────────────────────────┤
│ - Validate input         │
│ - Hash password          │
│ - Create user in DB      │
│ - Generate JWT token     │
└────────┬──────────────────┘
         │
┌────────▼──────────────────┐
│ Database (PostgreSQL)     │ User created in 'users' table
└────────┬──────────────────┘
         │
┌────────▼──────────────────┐
│ Response                  │ { user: {...}, token: "jwt..." }
└─────────────────────────────┘
```

---

## 📁 All Important Files

### Startup & Configuration

- `src/index.ts` - Application starts here
- `src/config/env.ts` - Environment configuration
- `package.json` - Dependencies and scripts
- `.env.example` - Copy to `.env` and fill in values

### Features

- `src/features/auth/` - Authentication (register, login)
- `src/features/user/` - User profiles
- Add more in `src/features/`

### GraphQL

- `src/graphql/schema.ts` - Combined GraphQL types
- `src/graphql/resolvers/index.ts` - Combined resolvers

### Database

- `prisma/schema.prisma` - Data models
- `prisma/migrations/` - Schema history
- `prisma/seed.ts` - Sample data

### Utilities

- `src/utils/jwt.ts` - Token management
- `src/utils/password.ts` - Password hashing
- `src/utils/errors.ts` - Error handling

### Documentation

- `README.md` - Project overview
- `QUICKSTART.md` - 5-minute setup
- `docs/API.md` - API reference
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/FEATURE_STRUCTURE.md` - Feature guide
- `docs/SETUP.md` - Detailed setup
- `docs/DATABASE.md` - Schema reference

---

## 🚀 Getting Started (3 Steps)

### 1. With Docker (Recommended) 🐳

```bash
docker-compose up -d
```

### 2. Or Local Setup

```bash
npm install
npm run prisma:migrate
npm run dev
```

### 3. Access GraphQL

Open: **http://localhost:4000/graphql**

---

## 📚 Documentation Map

```
START HERE ↓

README.md
  └─→ QUICKSTART.md (5-min setup)
       └─→ docs/SETUP.md (detailed setup)
            └─→ FEATURE_BASED_STRUCTURE.md (architecture overview)
                 ├─→ docs/ARCHITECTURE.md (deep dive + patterns)
                 ├─→ docs/FEATURE_STRUCTURE.md (how to add features)
                 ├─→ docs/API.md (API reference)
                 └─→ docs/DATABASE.md (schema reference)
```

---

## ✨ Current Features

### ✅ Authentication (Auth Feature)

- User registration (email, password, name, phone, address)
- User login (email, password)
- JWT token generation
- Password hashing with bcryptjs

### ✅ User Profile (User Feature)

- Get user by ID
- Get current authenticated user
- Update profile information

### 🔜 Coming Soon

- Product listings
- Rental management
- Purchase transactions
- Reviews & ratings
- Messaging system
- Wishlist

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start with auto-reload
npm run build           # Compile TypeScript
npm run start           # Run compiled version

# Database
npm run prisma:migrate  # Create/apply migrations
npm run prisma:studio   # Open database UI
npm run prisma:seed     # Add sample data

# Code Quality
npm run lint            # Check code
npm run format          # Format code
npm run type-check      # Check TypeScript types
```

---

## 🎓 Learning Path

### Day 1: Setup & Understanding

1. Run: `npm install && npm run dev`
2. Read: `QUICKSTART.md`
3. Explore: `docs/SETUP.md`

### Day 2: Architecture & Concepts

1. Read: `FEATURE_BASED_STRUCTURE.md`
2. Read: `docs/ARCHITECTURE.md`
3. Understand: How features work together

### Day 3: API Testing

1. Visit: `http://localhost:4000/graphql`
2. Read: `docs/API.md`
3. Try: Register and Login mutations

### Day 4: Database

1. Run: `npm run prisma:studio`
2. Read: `docs/DATABASE.md`
3. Understand: The schema

### Day 5: Add Features

1. Read: `docs/ARCHITECTURE.md` (Adding a Feature)
2. Create: Your first feature (e.g., Products)
3. Test: In GraphQL playground

---

## 🔐 Security Features

✅ **Password Security**

- Hashed with bcryptjs (10 salt rounds)
- Never stored in plain text

✅ **Token Security**

- JWT tokens with configurable expiry
- Bearer token in Authorization header
- Token verification on protected endpoints

✅ **Input Validation**

- Email format validation
- Required fields checking
- Data type validation

✅ **Error Handling**

- No sensitive info in error messages
- Proper HTTP status codes
- Detailed logs in development

---

## 📊 Database Schema

### Users Table

- id, email, password, firstName, lastName, phone, address
- Timestamps: createdAt, updatedAt

### Listings Table

- id, title, description, category, condition, price, rentalPrice
- Relations: Belongs to User

### Sales Table

- id, listingId, buyerId, sellerId, price, status
- Relations: Listing, Buyer, Seller

### Rentals Table

- id, listingId, renterUserId, ownerUserId, startDate, endDate
- Relations: Listing

---

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
npm install
npm run prisma:generate
```

### Port 4000 already in use

```bash
# Kill process or change PORT in .env
lsof -ti:4000 | xargs kill -9
```

### Database connection failed

```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Test: psql $DATABASE_URL -c "SELECT 1"
```

### Migrations failed

```bash
npm run prisma:generate
npm run prisma:migrate
```

---

## 📈 Project Growth Plan

```
Phase 1 (DONE) ✅
├── User authentication
├── User profiles
└── Database setup

Phase 2 (NEXT)
├── Product listings
├── Search & filter
└── Product details

Phase 3 (AFTER)
├── Rental system
├── Purchase system
└── Order tracking

Phase 4 (FUTURE)
├── Reviews & ratings
├── Messaging
└── Wishlist/Favorites

Phase 5 (ADVANCED)
├── Payment integration
├── Analytics
└── Admin dashboard
```

---

## 💡 Key Concepts

### Service Layer

- Business logic
- Database operations
- No GraphQL knowledge
- Reusable across resolvers

### Resolver Layer

- GraphQL specific
- Calls services
- Handles context
- No database queries

### Type Layer

- GraphQL schema definitions
- Input types
- Return types
- Shared with frontend

---

## 🤝 Feature Communication Example

```typescript
// In rental.service.ts
import { getProduct } from '../products/product.service.js';
import { getUserById } from '../user/user.service.js';

export async function createRental(data) {
  // Use services from other features
  const product = await getProduct(data.productId);
  const user = await getUserById(data.userId);

  // Business logic
  return prisma.rental.create({ data });
}
```

---

## 📝 Code Examples

### Add a Simple Feature (30 minutes)

```typescript
// 1. src/features/products/product.service.ts
export async function getProduct(id: string) {
  return prisma.listing.findUnique({ where: { id } });
}

// 2. src/features/products/product.resolver.ts
export const productResolvers = {
  Query: {
    async product(_parent, { id }) {
      return getProduct(id);
    },
  },
};

// 3. src/features/products/product.types.ts
export const productTypeDefs = `
  type Product { id! title! ... }
  extend type Query { product(id: ID!): Product }
`;

// 4. Update src/features/index.ts with exports
// 5. Update src/graphql/schema.ts to import types
// 6. Update src/graphql/resolvers/index.ts to add resolvers

// Done! Test in GraphQL playground
```

---

## ✅ Pre-flight Checklist

Before starting development:

- [ ] `npm install` completed
- [ ] `.env` file created with DATABASE_URL
- [ ] PostgreSQL running
- [ ] `npm run prisma:migrate` completed
- [ ] `npm run dev` starts without errors
- [ ] GraphQL playground loads at localhost:4000/graphql
- [ ] Health check works: `curl localhost:4000/health`

---

## 🎯 Next Actions

### Immediate (Today)

1. Follow QUICKSTART.md
2. Get server running
3. Test health endpoint

### Short Term (This Week)

1. Study architecture docs
2. Understand feature structure
3. Test API endpoints

### Medium Term (This Month)

1. Add Products feature
2. Add Rentals feature
3. Add Sales feature

### Long Term

1. Add Reviews/Ratings
2. Add Messaging
3. Add Payment integration

---

## 📞 Quick Help

| Question                | Answer                 | File                       |
| ----------------------- | ---------------------- | -------------------------- |
| How do I start?         | `npm run dev`          | README.md                  |
| How do I add a feature? | Create folder, 3 files | docs/ARCHITECTURE.md       |
| How do I test API?      | Go to /graphql         | docs/API.md                |
| How do I change DB?     | Edit schema.prisma     | docs/DATABASE.md           |
| How is it structured?   | Feature-based          | FEATURE_BASED_STRUCTURE.md |

---

## 🎉 You're All Set!

Your Teebay Backend is ready for development.

**Next step:** Run `npm run dev` and start building! 🚀

---

**For detailed information, see the documentation in `/docs` folder.**
