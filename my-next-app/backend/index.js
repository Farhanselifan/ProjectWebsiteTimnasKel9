const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000; // backend jalan di 5000

app.use(cors());
app.use(express.json());

// KONEKSI DATABASE (sesuaikan dengan XAMPP kamu)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // default XAMPP kosong
  database: "profile_timnas",
});

// Cek koneksi DB
db.connect((err) => {
  if (err) {
    console.error("Error connect DB:", err);
  } else {
    console.log("MySQL connected");
  }
});

// ROUTE TEST
app.get("/", (req, res) => {
  res.json({ message: "Express backend is running" });
});

// GET semua user
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST tambah user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, email });
  });
});

// GET user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(results[0]);
  });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, email });
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Deleted" });
  });
});

// REAL CODE 

// GET NEWS 
app.get("/news", (req, res) => {
  const sql = "SELECT * FROM news ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET JADWAL
app.get("/matches", (req, res) => {
  const sql = "SELECT * FROM matches ORDER BY match_date, match_time";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});



// GET PEMAIN

app.get("/players", (req, res) => {
  const sql = "SELECT * FROM players ORDER BY name ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST tambah pemain
app.post("/players", (req, res) => {
  const { name, position } = req.body;

  if (!name || !position) {
    return res.status(400).json({ message: "name dan position wajib diisi" });
  }

  const sql = "INSERT INTO players (name, position) VALUES (?, ?)";
  db.query(sql, [name, position, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      id: result.insertId,
      name,
      position,
    });
  });
});

// GET satu pemain by id
app.get("/players/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM players WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Pemain tidak ditemukan" });
    res.json(results[0]);
  });
});

// UPDATE pemain
app.put("/players/:id", (req, res) => {
  const { id } = req.params;
  const { name, position } = req.body;

  const sql = "UPDATE players SET name = ?, position = ? WHERE id = ?";
  db.query(sql, [name, position, id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ id, name, position });
  });
});

// DELETE pemain
app.delete("/players/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM players WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Pemain dihapus" });
  });
});



app.get("/store_items", (req, res) => {
  const sql = "SELECT * FROM store_items ORDER BY id ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error get store_items:", err);
      return res.status(500).json({ error: "Failed to fetch store items" });
    }

    // PENTING → langsung array
    res.json(results);
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
