# 🚀 Teebay Backend - Quick Start

## Option A: Docker (Recommended) 🐳

**One command setup:**

```bash
docker-compose up -d
```

**Done!** Everything is running:

- ✅ PostgreSQL at localhost:5432
- ✅ Node.js at http://localhost:4000/graphql
- ✅ Migrations auto-applied

**Stop:**

```bash
docker-compose down
```

---

## Option B: Local Setup

### 1. Install

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://teebay_user:teebay_password@localhost:5432/teebay_db"
JWT_SECRET="your-secret-key"
```

### 3. Create Database

```bash
createdb teebay_db
```

### 4. Migrate

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Run

```bash
npm run dev
```

---

## Test API

Open: **http://localhost:4000/graphql**

### Register User

```graphql
mutation {
  register(
    data: {
      email: "test@example.com"
      password: "Password123!"
      firstName: "John"
      lastName: "Doe"
      phone: "+1234567890"
      address: "123 Main St"
    }
  ) {
    user {
      id
      email
    }
    token
  }
}
```

### Login

```graphql
mutation {
  login(email: "test@example.com", password: "Password123!") {
    user {
      id
      email
    }
    token
  }
}
```

---

## Common Commands

```bash
# Development
npm run dev              # Start with auto-reload

# Database
npm run prisma:migrate  # Create migrations
npm run prisma:studio   # View database UI
npm run prisma:seed     # Add sample data

# Docker
docker-compose up       # Start
docker-compose down     # Stop
docker-compose logs -f  # View logs
```

---

## Documentation

- **Setup Details**: `docs/SETUP.md`
- **API Reference**: `docs/API.md`
- **Database Schema**: `docs/DATABASE.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Docker Guide**: `DOCKER_SETUP.md`

---

**Ready to code! 🎉**
