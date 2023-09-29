import { Router } from 'express';
import { configureUserRoutes } from './userRoutes';
import { configureAuthRoutes } from './authRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './../swagger';

const router = Router();

configureUserRoutes(router);
configureAuthRoutes(router);

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
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;