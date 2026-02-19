const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Обработчик для маршрута /api/quote
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/6a9284f4570296ea2756959c337113d797353c70/gistfile1.txt');
    
    const quotes = response.data
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).send(randomQuote);
  } catch (error) {
    res.status(500).send('Error loading quotes.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
