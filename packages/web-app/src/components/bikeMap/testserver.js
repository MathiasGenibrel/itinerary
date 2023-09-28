import express from 'express';
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/bike-data', async (req, res) => {
  try {
    const response = await fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=-1&refine=nom_arrondissement_communes%3A%22Paris%22&refine=is_installed%3A%22OUI%22'
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error fetching bike data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});