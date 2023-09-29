import express from 'express';
import cors from 'cors';
import { Router } from 'express';

export function configureExpressApp(app: Router) {
  const corsOptions = {
    origin: process.env.CORSORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  import('./../routes/index.js');
}