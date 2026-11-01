import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { SHOES } from "./shoes.js";
 
const db = new Database(fileURLToPath(new URL("./store.db", import.meta.url)));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
 
db.exec(`
  CREATE TABLE IF NOT EXISTS shoes (
    id        INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    cat       TEXT NOT NULL,
    price     REAL NOT NULL,
    old_price REAL NOT NULL,
    color     TEXT,
    hex       TEXT,
    badge     TEXT,
    rating    REAL,
    reviews   INTEGER,
    sizes     TEXT NOT NULL,   -- JSON array
    descr     TEXT,
    tags      TEXT,            -- JSON array
    imgs      TEXT             -- JSON array
  );
 
  CREATE TABLE IF NOT EXISTS orders (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    address      TEXT NOT NULL,
    total        REAL NOT NULL,
    created_at   TEXT DEFAULT CURRENT_TIMESTAMP
  );
 
  CREATE TABLE IF NOT EXISTS order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL REFERENCES orders(id),
    shoe_id    INTEGER NOT NULL REFERENCES shoes(id),
    size       REAL NOT NULL,
    qty        INTEGER NOT NULL,
    unit_price REAL NOT NULL
  );
`);
 
// Seed the shoes table on first run
const { n } = db.prepare("SELECT COUNT(*) AS n FROM shoes").get();
if (n === 0) {
  const insert = db.prepare(`
    INSERT INTO shoes (id,name,cat,price,old_price,color,hex,badge,rating,reviews,sizes,descr,tags,imgs)
    VALUES (@id,@name,@cat,@price,@old,@color,@hex,@badge,@rating,@reviews,@sizes,@desc,@tags,@imgs)
  `);
  const seed = db.transaction(list => {
    for (const s of list) {
      insert.run({
        ...s,
        sizes: JSON.stringify(s.sizes),
        tags: JSON.stringify(s.tags),
        imgs: JSON.stringify(s.imgs),
      });
    }
  });
  seed(SHOES);
  console.log(`Seeded ${SHOES.length} shoes`);
}
 
export default db;
 
