const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Обработчик для маршрута /api/quote
app.get('/api/quote', async (req, res) => {
  try {
    // Получаем данные с Gist
    const response = await axios.get('https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/34fab88c183d5c4e3fd0426e8333d0e0865318f6/gistfile1.txt');
    
    // Разбиваем текст на строки
    const quotes = response.data
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    // Выбираем случайную цитату
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Отправляем случайную цитату в ответ
    res.status(200).send(randomQuote);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).send('Error loading quotes.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
