import { Router } from 'express';
import { configureUserRoutes } from './userRoutes';
import { configureAuthRoutes } from './authRoutes';

const router = Router();

configureUserRoutes(router);
configureAuthRoutes(router);

export default router;