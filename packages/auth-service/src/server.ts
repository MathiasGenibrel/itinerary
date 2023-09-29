import express from 'express';
import "reflect-metadata";
import dotenv from 'dotenv';
import { configureExpressApp } from './config/app';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

configureExpressApp(app);

app.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});