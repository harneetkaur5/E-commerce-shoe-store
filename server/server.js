import express from "express";
import cors from "cors";
import { randomInt } from "node:crypto";
import db from "./db.js";
 
const app = express();
app.use(cors());
app.use(express.json());
 
// DB row -> the shape your React components already expect
const toShoe = r => ({
  id: r.id, name: r.name, cat: r.cat, price: r.price, old: r.old_price,
  color: r.color, hex: r.hex, badge: r.badge, rating: r.rating, reviews: r.reviews,
  sizes: JSON.parse(r.sizes), desc: r.descr,
  tags: JSON.parse(r.tags), imgs: JSON.parse(r.imgs),
});
 
// ── GET all shoes ──
app.get("/api/shoes", (_req, res) => {
  const rows = db.prepare("SELECT * FROM shoes ORDER BY id").all();
  res.json(rows.map(toShoe));
});
 
// ── GET one shoe ──
app.get("/api/shoes/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM shoes WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Shoe not found" });
  res.json(toShoe(row));
});
 
// ── POST an order ──
// Body: { name, email, address, items: [{ id, size, qty }] }
// Prices are read from the database, never trusted from the browser.
const getShoe = db.prepare("SELECT id, price, sizes FROM shoes WHERE id = ?");
const insertOrder = db.prepare(
  "INSERT INTO orders (order_number, name, email, address, total) VALUES (?,?,?,?,?)"
);
const insertItem = db.prepare(
  "INSERT INTO order_items (order_id, shoe_id, size, qty, unit_price) VALUES (?,?,?,?,?)"
);
const orderExists = db.prepare("SELECT 1 FROM orders WHERE order_number = ?");
 
const makeOrderNumber = () => {
  let num;
  do { num = "SOLE-" + randomInt(10000, 100000); } while (orderExists.get(num));
  return num;
};
 
const placeOrder = db.transaction((name, email, address, lines) => {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const orderNumber = makeOrderNumber();
  const { lastInsertRowid } = insertOrder.run(orderNumber, name, email, address, total);
  for (const l of lines) insertItem.run(lastInsertRowid, l.id, l.size, l.qty, l.price);
  return { orderNumber, total };
});
 
app.post("/api/orders", (req, res) => {
  const { name, email, address, items } = req.body ?? {};
 
  if (!name?.trim() || !address?.trim())
    return res.status(400).json({ error: "Name and address are required" });
  if (!/^\S+@\S+\.\S+$/.test(email ?? ""))
    return res.status(400).json({ error: "Enter a valid email" });
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "Cart is empty" });
 
  const lines = [];
  for (const it of items) {
    const shoe = getShoe.get(it.id);
    const qty = Number(it.qty);
    const size = Number(it.size);
    if (!shoe) return res.status(400).json({ error: `Unknown shoe ${it.id}` });
    if (!JSON.parse(shoe.sizes).includes(size))
      return res.status(400).json({ error: `Size ${it.size} unavailable` });
    if (!Number.isInteger(qty) || qty < 1 || qty > 10)
      return res.status(400).json({ error: "Invalid quantity" });
    lines.push({ id: shoe.id, price: shoe.price, size, qty });
  }
 
  try {
    res.status(201).json(placeOrder(name.trim(), email.trim(), address.trim(), lines));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not save order" });
  }
});
 
// ── GET all orders (with their items) ──
const listOrders = db.prepare("SELECT * FROM orders ORDER BY id DESC");
const listItems = db.prepare(`
  SELECT oi.shoe_id, s.name, oi.size, oi.qty, oi.unit_price
  FROM order_items oi JOIN shoes s ON s.id = oi.shoe_id
  WHERE oi.order_id = ?
`);

app.get("/api/orders", (_req, res) => {
  res.json(listOrders.all().map(o => ({ ...o, items: listItems.all(o.id) })));
});

// ── Root: this is only the API, point people to the website ──
app.get("/", (_req, res) => {
  res.type("html").send(`
    <h2>SOLE API is running ✅</h2>
    <p>This port only serves data. Open the store at
      <a href="http://localhost:5173">http://localhost:5173</a>
      (start it with <code>npm start</code> from the project root folder).</p>
    <p>Try: <a href="/api/shoes">/api/shoes</a> · <a href="/api/orders">/api/orders</a></p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
 

