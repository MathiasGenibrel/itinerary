import express from 'express';
import "reflect-metadata";
import dotenv from 'dotenv';
import { configureExpressApp } from './config/app';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

configureExpressApp(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});