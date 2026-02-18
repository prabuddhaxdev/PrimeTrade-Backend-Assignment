# 🚀 TeamAccess – Scalable Task Management Platform

> A production-grade task management system with JWT Authentication & Advanced Role-Based Access Control.

---

## 📌 Assignment Context

Built as part of a **Backend Engineering Internship Assignment (3 Days)** focused on:

- Designing a scalable REST API
- Implementing secure JWT authentication
- Enforcing strict Role-Based Access Control (RBAC)
- Creating a clean database architecture
- Building a minimal frontend UI to test APIs
- Delivering production-level documentation

This project emphasizes backend engineering quality — not just CRUD functionality.

---

# 🏗 Architecture Overview

## 🔹 Backend (Primary Focus)

Built using **Next.js App Router (API Routes)** as a backend service with:

- PostgreSQL
- Prisma ORM
- JWT authentication (HTTP-only cookies)
- Versioned REST APIs

## 🔹 Frontend (Supportive UI)

Role-aware dashboards with protected routes and persistent sessions.

---

# 🔐 Authentication System

- Secure user registration with password hashing
- JWT-based login & logout
- HTTP-only secure cookies
- Persistent sessions
- Role-based redirects after login
- Middleware-protected API routes

---

# 🛡 Role-Based Access Control (RBAC)

Four distinct roles with strict permission boundaries:

| Role            | Permissions                                                           |
| --------------- | --------------------------------------------------------------------- |
| **Super Admin** | Full system access (users, roles, teams, tasks, system-level control) |
| **Admin**       | Manage users and teams                                                |
| **Manager**     | Team-specific management and member assignment                        |
| **User**        | Basic dashboard access and team visibility                            |

### Authorization Enforcement
- Middleware-level authorization
- Server-side role verification
- Immediate effect on role promotion/demotion
- Protected frontend routes

---

# 📦 Core Features

## 👥 User & Role Management
- Promote/demote roles (Super Admin controlled)
- Immediate permission updates
- Secure role validation on every protected request

## 📁 Team Management
- Create teams
- Assign members via dropdown selectors
- Team-member relationship via junction table
- Manager-specific team visibility

## ✅ Task Management (CRUD)
- Create tasks
- Retrieve tasks
- Update tasks
- Delete tasks
- Role-restricted task operations

## 🌐 RESTful API Design
- Versioned endpoints (`/api/v1/...`)
- Proper HTTP status codes (`200`, `201`, `401`, `403`, `404`, `500`)
- Centralized error handling
- Validation layer

---

# 🔒 Security Practices

- Password hashing
- JWT stored in HTTP-only cookies
- Protected API middleware
- Role validation per request
- Input validation
- Type-safe database queries with Prisma
- Clean separation of auth and business logic

---

# 🛠 Backend Tech Stack

- **Next.js 16 (App Router API)**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **Bcrypt library + Zod validation**
- **TypeScript**
- RESTful API Principles
- API Versioning
- Postman Documentation

---

# 🎨 Frontend Features

## 🖥 Dashboards

- **Super Admin Dashboard** – Full system control
- **Admin Dashboard** – User & team management
- **Manager Dashboard** – Team-specific management
- **User Dashboard** – Clean task-focused interface

## ⚡ UX Highlights

- Automatic redirect for unauthorized access
- Role-based dashboard rendering
- Persistent cookie-based authentication
- Real-time permission updates
- Success & error message handling
- Dark-themed UI with Tailwind CSS

---

# 🛠 Frontend Tech Stack

- **Next.js 16 App Router**
- **TypeScript**
- **React 19**
- **Tailwind CSS**
- Custom API Client Layer

---

# 🗂 Database Schema

### Core Entities

- `Users` (with role field)
- `Teams`
- `TeamMembers` (junction table)
- `Tasks`

✔ Relational integrity
✔ Indexed foreign keys
✔ Scalable schema design

---

# 🧪 Example API Endpoints

## 🔐 Authentication

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
```


## 👤 User and Roles

```
GET    /api/v1/users
PATCH  /api/v1/users/:id/role

```
## 📁 Teams
```
POST   /api/v1/teams
GET    /api/v1/teams
POST   /api/v1/teams/:id/members
```

## ✅ Tasks
```
POST   /api/v1/tasks
GET    /api/v1/tasks
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

# ⚙️ Setup Instructions

1️⃣ Clone Repository
```bash
git clone <https://github.com/prabuddhaxdev/PrimeTrade-Backend-Assignment.git>

cd PrimeTrade-Backend-Assignment

```

2️⃣ Start PostgreSQL with Docker
```bash
docker-compose up -d postgres

```
This will:

Start a PostgreSQL container

Create the database defined in docker-compose.yml

Expose it on port 5432

Persist data using Docker volumes



3️⃣ Configure Environment Variables

Create a .env file in the root directory:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/primetrade_db?schema=public"

JWT_SECRET="your-super-secret-key"


```

4️⃣ Run Database Migrations
```
npx prisma migrate dev

```

5️⃣ Start Development Server

```
npm run dev

```