import express from 'express';
import mapController from './controllers/mapController';

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());


app.use('/', mapController);

// Autres routes et configurations

app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});