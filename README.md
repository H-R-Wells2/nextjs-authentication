# Authentication Starter Template for Next.js 15

*(App Router + Auth.js + Prisma + MongoDB + Nodemailer)*

This repository provides a complete, reusable authentication system built with modern tools in the Next.js ecosystem. It’s designed as a plug-and-play solution for projects that require secure, scalable user authentication out of the box.

---

## ✨ Features

* **Next.js 15** with App Router
* **Auth.js** for authentication

  * Credentials-based login
  * Google OAuth provider
* **Prisma** ORM with **MongoDB**
* **Nodemailer** for email (password reset, verification)
* **Tailwind CSS** for styling
* **Zustand** for global state management
* Modular API structure with clean folder organization

---

## 🗂 Folder Structure Overview

```
app/
  (auth)/                  # Authentication pages (signin, signup, reset-password, etc.)
  api/auth/                # Auth-related API routes
  api/auth/[...nextauth]/  # NextAuth config

lib/                       # Shared logic (token generation, email, password hashing)
types/                     # TypeScript interfaces and types
prisma/                    # Prisma schema and migrations
public/                    # Static assets
components/                    # Reusabel components
```

---

## 🛠 Technologies Used

* **Next.js 15** (App Router)
* **Auth.js**

  * Credentials provider
  * Google OAuth
* **Prisma** + **MongoDB**
* **Nodemailer** with Gmail SMTP
* **Tailwind CSS**
* **Zustand**

---

## 🔐 Environment Variables (`.env.local`)

```env
AUTH_SECRET=

NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GMAIL_USER=
GMAIL_APP_PASSWORD=

DATABASE_URL=
```

> ⚠️ Make sure to use an app password for `GMAIL_APP_PASSWORD` if you’re using Gmail.

---

## 🚀 Getting Started

1. **Clone this repository** or use it as a GitHub template
2. **Create `.env.local`** and add all required environment variables
3. **Install dependencies**

   ```bash
   npm install
   ```
4. **Push Prisma schema**

   ```bash
   npx prisma db push
   ```
5. **Run development server**

   ```bash
   npm run dev
   ```

---

## 🧱 Perfect For:

* Projects that need production-ready authentication
* Teams or solo developers reusing a common auth system
* Boilerplate for SaaS apps, admin panels, or user dashboards

---
