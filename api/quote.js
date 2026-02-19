import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/6a9284f4570296ea2756959c337113d797353c70/gistfile1.txt");
    
    const quotes = response.data
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0);

    const random = quotes[Math.floor(Math.random() * quotes.length)];

    res.status(200).send(random);
  } catch (error) {
    res.status(500).send("Error loading quotes.");
  }
}
