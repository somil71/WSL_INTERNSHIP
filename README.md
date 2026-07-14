# OrderIt — Food Ordering Web App (MERN Stack)

A full-stack food ordering platform built with MongoDB, Express, React (Vite) and Node.js. Built as part of the WSA Internship (WMSI26_007).

## Features

- Restaurant & menu browsing, search and filters (Pure Veg, sort by rating/reviews)
- Food item catalog with images (Cloudinary storage)
- Cart and checkout flow with Stripe payments
- Coupons/discounts
- User authentication (JWT, cookies) — register, login, profile, update profile
- Order placement, order history and order details
- Email notifications (Nodemailer + Mailtrap)
- AI-assisted dish description/tagging using Groq (Llama 3.1) — auto-generates description, tags, allergens and meal-timing suggestions for a dish
- AI recipe generator (`/recipe-generator`) — turns a list of ingredients into a recipe via Groq
- Forgot/reset password flow

## Tech Stack

**Frontend:** React 18, Vite, Redux Toolkit, React Router, React Bootstrap, Stripe.js, Axios
**Backend:** Node.js, Express, Mongoose (MongoDB Atlas), JWT auth, Cloudinary, Multer, Stripe, Nodemailer, Groq API

## Project Structure

```
FoodProject/
├── backend/          # Express REST API
│   ├── controllers/  # Route handlers (auth, cart, order, payment, restaurant, menu, food item, coupon, AI)
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   ├── middlewares/   # Auth guard & error handling
│   ├── services/      # Groq AI integration
│   └── config/        # DB & Cloudinary config
└── frontend/          # React + Vite SPA
    └── src/
        ├── components/ # Home, Menu, Cart, Orders, User auth, layout
        ├── redux/       # Store, actions, reducers
        └── utils/       # Axios API client
```

## Getting Started

### 1. Backend

```bash
cd backend
npm install
cp config/config.env.example config/config.env   # fill in your own secrets
npm run dev
```
Runs on `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on `http://localhost:5173`.

## API Overview

Base path: `/api/v1`

| Resource | Path |
|---|---|
| Restaurants | `/eats/stores` |
| Menus | `/eats/menus` |
| Food Items | `/eats` |
| Cart | `/eats/cart` |
| Orders | `/eats/orders` |
| Auth/Users | `/users` |
| Payments | `/payment`, `/payment/process` |
| Coupons | `/coupon` |
| AI | `/ai` |

## Note

`backend/config/config.env` is intentionally excluded from version control since it holds real credentials (DB, Cloudinary, Stripe, Groq, JWT). Use `config.env.example` as a template.

The AI features (dish description generation, review sentiment, recipe generator) require a valid `GROQ_API_KEY` from [console.groq.com](https://console.groq.com/keys). If those features return a 401, the key has expired/been revoked — generate a new one and update `config.env`.
