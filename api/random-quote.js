import fetch from 'node-fetch';

const GIST_URL = 'https://gist.githubusercontent.com/Pheromoneo/6fcf69b4069ca396def39c52576e9b07/raw/340bde2745be222ff3a21c67591ec51fb3136094/gistfile1.txt';

export default async function handler(req, res) {
    try {
        console.log('Fetching quotes from Gist...');
        const response = await fetch(GIST_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch from Gist');
        }

        const data = await response.text();
        const quotes = data.split('\n').filter(line => line.trim() !== '');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        res.status(200).json({ quote: randomQuote });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
}
 
