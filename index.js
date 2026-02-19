import express from 'express'; // Для работы с Express
import fetch from 'node-fetch'; // Для выполнения HTTP-запросов

const app = express();
const port = process.env.PORT || 3000;

// Убедись, что правильно настроен URL
const GIST_URL = 'https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/340bde2745be222ff3a21c67591ec51fb3136094/gistfile1.txt';

app.get('/random-quote', async (req, res) => {
    try {
        console.log('Fetching quotes from Gist...');
        const response = await fetch(GIST_URL);

        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error('Failed to fetch from Gist');
        }

        const data = await response.text();
        const quotes = data.split('\n').filter(line => line.trim() !== '');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        res.json({ quote: randomQuote });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

// Запуск сервера на порту
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
