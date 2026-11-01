# SOLE — E-commerce Shoe Store

A full-stack shoe store built with **React + Vite** on the frontend and **Node.js / Express + SQLite** on the backend.

## Features

- Browse 12 shoes loaded from a SQLite database
- Filter by category, search, and sort by price or rating
- Product details with image gallery and size selection
- Cart drawer with quantity controls and a wishlist
- Checkout that saves orders to the database. Prices are checked on the server and never taken from the browser.

## Tech stack

| Layer    | Tech                                   |
|----------|----------------------------------------|
| Frontend | React 19, Vite                         |
| Backend  | Node.js, Express                       |
| Database | SQLite (via `better-sqlite3`)          |

## Getting started

Requires Node.js 18 or newer.

```bash
npm run setup     # installs frontend + server dependencies
npm start         # runs the API (port 3001) and the website (port 5173) together
```

Open http://localhost:5173.

The database file `server/store.db` is created and filled with shoes the first time the server starts. Delete it to reset the store.

## Project structure

```
├── src/                 React frontend
│   ├── App.jsx          Main store UI (grid, product modal, cart)
│   ├── CheckoutModal.jsx Checkout form, posts orders to the API
│   └── api.js           Small fetch wrapper for the backend
├── server/              Express backend
│   ├── server.js        REST API routes
│   ├── db.js            SQLite schema + seeding
│   └── shoes.js         Seed data
└── vite.config.js       Proxies /api requests to the backend in development
```

## API

| Method | Endpoint          | Description                                   |
|--------|-------------------|-----------------------------------------------|
| GET    | `/api/shoes`      | List all shoes                                |
| GET    | `/api/shoes/:id`  | Get one shoe                                  |
| POST   | `/api/orders`     | Place an order `{ name, email, address, items: [{ id, size, qty }] }` |
| GET    | `/api/orders`     | List saved orders with their items            |

## Database schema

- **shoes**: the product catalogue
- **orders**: one row per order (customer details, total, timestamp)
- **order_items**: the shoes in each order (size, quantity, price paid). Links to `orders` and `shoes`.

> Card details on the checkout form are for demo only and are never sent to the server.
