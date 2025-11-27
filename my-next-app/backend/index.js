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


// GET /api/products/:dynamic_route
app.get("/product", (req, res) => {
  const sql = "SELECT * FROMproducts"; // tidak ada WHERE ?, tidak perlu parameter

  db.execute(sql, [], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error mengambil produk" });
    }
    res.json(results);
  });
});


// CREATE news
app.post("/news", (req, res) => {
  console.log("BODY DITERIMA:", req.body);

  const { title, description, news_images, date } = req.body;

  // Validasi minimal, TANPA cek date
  if (!title || !description || !news_images) {
    return res
      .status(400)
      .json({ message: "title, description, news_images wajib diisi" });
  }

  // Date boleh kosong → kalau kosong, backend isi otomatis
  // Format: "27 NOVEMBER 2025"
  let tanggal;
  if (!date || date.trim() === "") {
    tanggal = todayString();
  } else {
    // Pakai apa adanya dari frontend, misal:
    // "17 SEPTEMBER 2025", "15 Sep", dll
    tanggal = date;
  }

  const sql =
    "INSERT INTO news (title, description, news_images, date) VALUES (?, ?, ?, ?)";
  const values = [title, description, news_images, tanggal];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "DB error", error: err });
    }

    return res.status(201).json({
      id: result.insertId,
      title,
      description,
      news_images,
      date: tanggal, // string bebas
    });
  });
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
