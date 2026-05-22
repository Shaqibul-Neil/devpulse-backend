# DevPulse API

A collaborative platform for software teams to report bugs, suggest features, and coordinate issue resolution workflows. The API provides secure authentication, role-based authorization, issue tracking, filtering, and workflow management.

---

## 🚀 Live URL

https://your-live-api-url.com

---

## ✨ Features

### Authentication & Authorization

- User registration with contributor or maintainer role
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes with token verification
- Role-based access control (RBAC)

### Issue Management

- Create bug reports and feature requests
- View all issues
- View a single issue
- Partial issue updates
- Delete issues
- Issue status management

### Filtering & Sorting

- Filter by issue type
- Filter by issue status
- Sort by newest or oldest

### Security

- Passwords are hashed before storage
- JWT verification middleware
- Protected endpoints
- Permission-based route access

### Validation & Error Handling

- Request validation using Zod
- Centralized global error handling
- Consistent API response structure

### Performance Optimization

- Batch reporter fetching using `WHERE id IN (...)`
- Eliminates N+1 query problem
- Uses PostgreSQL connection pooling

---

## 📊 Database Schema Summary

### Users Table

| Column     | Type         | Description                   |
| ---------- | ------------ | ----------------------------- |
| id         | SERIAL       | Auto-incrementing primary key |
| name       | VARCHAR(150) | User full name                |
| email      | VARCHAR(255) | Unique email address          |
| password   | VARCHAR(255) | Hashed password               |
| role       | VARCHAR(20)  | contributor or maintainer     |
| created_at | TIMESTAMPTZ  | Account creation timestamp    |
| updated_at | TIMESTAMPTZ  | Last update timestamp         |

### Issues Table

| Column      | Type         | Description                    |
| ----------- | ------------ | ------------------------------ |
| id          | SERIAL       | Auto-incrementing primary key  |
| title       | VARCHAR(150) | Issue title                    |
| description | TEXT         | Detailed issue description     |
| type        | VARCHAR(20)  | bug or feature_request         |
| status      | VARCHAR(20)  | open, in_progress, or resolved |
| reporter_id | INTEGER      | ID of the issue reporter       |
| created_at  | TIMESTAMPTZ  | Issue creation timestamp       |
| updated_at  | TIMESTAMPTZ  | Last update timestamp          |

### Relationship

- One user can create multiple issues.
- Each issue belongs to a single reporter.
- `reporter_id` stores the ID of the user who created the issue.
- Reporter information is resolved through application logic without SQL JOINs, following assignment requirements.

## 🛠 Tech Stack

| Technology   | Usage                    |
| ------------ | ------------------------ |
| Node.js      | Runtime                  |
| TypeScript   | Language                 |
| Express.js   | Backend Framework        |
| PostgreSQL   | Database                 |
| pg           | Native PostgreSQL Driver |
| Raw SQL      | Database Queries         |
| bcrypt       | Password Hashing         |
| jsonwebtoken | JWT Authentication       |
| Zod          | Validation               |

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/devpulse-api.git
cd devpulse-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3000

DATABASE_URL=postgresql://username:password@localhost:5432/devpulse_db

JWT_ACCESS_TOKEN_SECRET=your_super_secret_key

JWT_REFRESH_TOKEN_SECRET=your_super_secret_key

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_EXPIRY=2d

JWT_REFRESH_EXPIRY=365d

```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build Project

```bash
npm run build
```

### 6. Start Production Server

```bash
npm start
```

# 📁 Project Structure

```text
src
│
├── app
│   ├── modules
│   │   ├── auth
│   │   │    ├──auth.controller.ts
│   │   │    ├──auth.models.ts
│   │   │    ├──auth.route.ts
│   │   │    ├──auth.service.ts
│   │   │    ├──auth.validation.ts
│   │   ├── users
│   │   │    ├──users.controller.ts
│   │   │    ├──users.models.ts
│   │   │    ├──users.route.ts
│   │   │    ├──users.service.ts
│   │   │    ├──users.interface.ts
│   │   |── issues
│   │   │    ├──issues.controller.ts
│   │   │    ├──issues.models.ts
│   │   │    ├──issues.route.ts
│   │   │    ├──issues.service.ts
│   │   │    ├──issues.validation.ts
│   │   │    ├──issues.interface.ts
│   │── routes
│   │      ├──index.ts
├── config
├── db
│   ├──schema
├── middlewares
│   │   ├── authenticate.ts
│   │   ├── authorize.ts
│   │   ├── validate.ts
│   │   └── globalErrorHandler.ts
└── utils
├── app.ts
└── index.ts
```

---

# 👨‍💻 Author

**Md. Shakibul Islam**

Built with Node.js, TypeScript, Express, PostgreSQL, Raw SQL, JWT, and Zod.
