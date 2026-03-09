# TamCode Design — Full-Stack Web App

A professional full-stack web application built with **Node.js + Express + MongoDB** on the backend and a rich interactive frontend featuring a portfolio, quiz app, memory game, and more.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (JSON Web Tokens) |
| **Security** | Helmet, Rate Limiting, CORS |

## 📁 Project Structure

```
TamCode-Design/
├── server.js              ← Main Express server
├── package.json
├── .env                   ← Environment variables (not committed)
├── backend/
│   ├── config/db.js       ← MongoDB connection
│   ├── models/            ← Mongoose models
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   ├── Subscriber.js
│   │   ├── QuizScore.js
│   │   └── Project.js
│   ├── controllers/       ← Business logic
│   ├── routes/            ← API routes
│   ├── middleware/        ← Auth & error handlers
│   └── seeder.js          ← DB seed script
├── admin/
│   └── index.html         ← Admin dashboard
├── js/
│   ├── main.js            ← Frontend logic
│   └── api.js             ← API integration
├── css/                   ← Stylesheets
├── prjects/quiz/          ← Quiz app (upgraded)
└── index.html             ← Main frontend
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env` and set your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tamcode
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@tamcode.com
ADMIN_PASSWORD=YourPassword123
```

### 3. Seed the Database
```bash
npm run seed
```
This creates the admin account and sample projects.

### 4. Start the Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/subscribe` | Subscribe to newsletter |
| POST | `/api/contact` | Submit contact/discount form |
| POST | `/api/quiz/score` | Submit quiz score |
| GET | `/api/quiz/leaderboard` | Get top quiz scores |
| GET | `/api/projects` | Get portfolio projects |
| GET | `/api/health` | Server health check |

### Admin (requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/contact` | View all contacts |
| PATCH | `/api/contact/:id` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |
| GET | `/api/subscribe` | View subscribers |
| DELETE | `/api/subscribe/:id` | Remove subscriber |
| GET | `/api/quiz/scores` | View all quiz scores |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

## 🔐 Admin Dashboard

Visit `/admin` to access the admin panel.

Default credentials (from `.env`):
- **Email**: `admin@tamcode.com`
- **Password**: `TamCode@2024`

**Change these in `.env` before deploying!**

## 🎮 Features

- **Landing Slider** — Animated hero section
- **Portfolio** — Dynamic project showcase from DB
- **Memory Game** — Card matching game with win detection
- **Quiz App** — Full quiz with timer, leaderboard & backend scoring
- **Newsletter** — Email subscription saved to DB
- **Contact/Discount Form** — Messages saved to DB
- **Admin Dashboard** — Manage contacts, subscribers, leaderboard, projects
- **JWT Auth** — Secure admin login

## 📦 Deployment

Recommended: **Render.com** (free tier)
1. Push to GitHub
2. Create a new Web Service on Render
3. Set environment variables
4. Deploy!

---
Made with ❤️ by **Tamer Alhashmi** — TamCode
