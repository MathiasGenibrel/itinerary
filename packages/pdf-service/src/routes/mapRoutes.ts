// routes/mapRoutes.ts

import express from 'express';
import { generateMap } from '../controllers/mapController'; // Utilisez l'importation appropriée

const router = express.Router();

// Définissez les routes spécifiques à la carte ici
router.post('/generate-map', generateMap); // Utilisez la fonction directement

export default router;