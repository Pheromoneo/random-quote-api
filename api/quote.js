// Используем axios для запроса
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Делаем запрос к Gist для получения цитат
    const response = await axios.get("https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/6a9284f4570296ea2756959c337113d797353c70/gistfile1.txt");
    
    // Разделяем текст на строки и фильтруем пустые строки
    const quotes = response.data
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0);

    // Выбираем случайную цитату
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    // Отправляем ответ
    res.status(200).send(random);
  } catch (error) {
    // Если произошла ошибка, отправляем сообщение об ошибке
    res.status(500).send("Error loading quotes.");
  }
}
