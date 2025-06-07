const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, '../database/motorcycle_parts.db');

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Get all parts
app.get('/api/parts', (req, res) => {
  db.all('SELECT * FROM parts', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get part by id
app.get('/api/parts/:id', (req, res) => {
  db.get('SELECT * FROM parts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Create new part
app.post('/api/parts', (req, res) => {
  const { make, model, name, year, description, image_url, quantity, price } = req.body;
  db.run(
    'INSERT INTO parts (make, model, name, year, description, image_url, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [make, model, name, year, description, image_url, quantity, price],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update part
app.put('/api/parts/:id', (req, res) => {
  const { make, model, name, year, description, image_url, quantity, price } = req.body;
  db.run(
    'UPDATE parts SET make = ?, model = ?, name = ?, year = ?, description = ?, image_url = ?, quantity = ?, price = ? WHERE id = ?',
    [make, model, name, year, description, image_url, quantity, price, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Delete part
app.delete('/api/parts/:id', (req, res) => {
  db.run('DELETE FROM parts WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
