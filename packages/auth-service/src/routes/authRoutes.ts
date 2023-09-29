import { Router } from 'express';

const router = Router();

router.post('/register', async (req, res) => {
  // Logique pour créer un utilisateur
});

router.post('/login', async (req, res) => {
  // Logique pour l'authentification
});

export function configureAuthRoutes(app: Router) {
  app.use('/auth', router);
}