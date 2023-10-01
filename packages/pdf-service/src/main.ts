// main.ts

import express from 'express';
import mapRoutes from './routes/mapRoutes';

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Montez vos routes
app.use('/api/map', mapRoutes);

// Autres routes et configurations

app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});