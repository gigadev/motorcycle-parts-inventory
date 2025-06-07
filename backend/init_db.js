const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_PATH = path.join(__dirname, '../database/motorcycle_parts.db');

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    name TEXT NOT NULL,
    year INTEGER,
    description TEXT,
    image_url TEXT,
    quantity INTEGER DEFAULT 0,
    price REAL DEFAULT 0.0
  )`);

  // Sample data
  const parts = [
    ['Honda', 'CBR600RR', 'Front Brake Pad', 2020, 'High performance brake pad for Honda CBR600RR.', 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=400&q=80', 10, 49.99],
    ['Yamaha', 'YZF-R1', 'Oil Filter', 2021, 'Premium oil filter for Yamaha YZF-R1.', 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80', 15, 19.99],
    ['Kawasaki', 'Ninja ZX-10R', 'Chain Kit', 2019, 'Durable chain kit for Kawasaki Ninja ZX-10R.', 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=400&q=80', 5, 129.99],
    ['Suzuki', 'GSX-R750', 'Air Filter', 2022, 'High flow air filter for Suzuki GSX-R750.', 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80', 20, 24.99],
    ['Ducati', 'Panigale V4', 'Spark Plug', 2023, 'Performance spark plug for Ducati Panigale V4.', 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', 8, 14.99]
  ];

  db.run('DELETE FROM parts'); // Clear existing data
  const stmt = db.prepare('INSERT INTO parts (make, model, name, year, description, image_url, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  for (const part of parts) {
    stmt.run(part);
  }
  stmt.finalize();

  console.log('Database initialized with sample data.');
});

db.close();
