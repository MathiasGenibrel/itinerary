import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import routes from './../routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './../swagger';

export function configureExpressApp(app: Router) {
  const corsOptions = {
    origin: process.env.CORSORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', routes);

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Obtenir la documentation Swagger
 *     description: Renvoie la documentation Swagger générée automatiquement pour l'API.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Documentation Swagger générée avec succès.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}