// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS untuk memungkinkan frontend mengakses API
app.use(cors());

// API route untuk mengambil data dari animechan.io
app.get('/api/quotes', async (req, res) => {
    try {
      const response = await axios.get('https://animechan.io/api/v1/random');
      console.log(response.data); // Log data yang diterima
      res.json(response.data); // Mengirimkan data ke frontend
    } catch (error) {
      console.error('Error fetching data from animechan.io:', error);
      res.status(500).json({ error: 'Error fetching data from animechan.io' });
    }
  });
  

// Menjalankan server pada port 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
