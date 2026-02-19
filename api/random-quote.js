import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Raw URL на Gist с цитатами
    const url = 'https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/6a9284f4570296ea2756959c337113d797353c70/gistfile1.txt';

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка при получении цитат: ${response.status}`);
    }

    const text = await response.text();
    const quotes = text.split('\n').filter(q => q.trim() !== '');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    res.status(200).json({ quote: randomQuote });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить цитату' });
  }
}
