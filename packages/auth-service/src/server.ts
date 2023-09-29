import express from 'express';
import "reflect-metadata";
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { configureExpressApp } from './config/app';
import { configureDatabase } from './config/database';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

configureDatabase();
configureExpressApp(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});