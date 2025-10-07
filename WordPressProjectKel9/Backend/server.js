const express = require('express');
const app = express();
const path = require('path');

// Middleware untuk melayani file HTML statis
app.use(express.static(path.join(__dirname, 'public')));

// Route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
