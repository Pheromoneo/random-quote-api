import fetch from 'node-fetch';

// URL к Gist для получения списка цитат
const GIST_URL = 'https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/340bde2745be222ff3a21c67591ec51fb3136094/gistfile1.txt';

export default async function handler(req, res) {
    try {
        // Логирование запроса
        console.log('Fetching quotes from Gist...');
        
        // Запрос данных с Gist
        const response = await fetch(GIST_URL);

        // Проверка успешности ответа
        if (!response.ok) {
            throw new Error('Failed to fetch from Gist');
        }

        // Получение данных в виде текста
        const data = await response.text();

        // Разделение текста на строки и фильтрация пустых строк
        const quotes = data.split('\n').filter(line => line.trim() !== '');

        // Выбор случайной цитаты
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Отправка цитаты в формате JSON
        res.status(200).json({ quote: randomQuote });
    } catch (error) {
        // Обработка ошибок
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
}
