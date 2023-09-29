import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { Request, Response, NextFunction } from 'express';

const router = Router();

/**
 * @swagger
 * /profil:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur
 *     description: Récupère le profil de l'utilisateur authentifié en utilisant un token JWT valide.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur récupéré avec succès.
 *       401:
 *         description: Token JWT invalide ou manquant.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur lors de la récupération du profil.
 */
router.get('/profil', (req, res,next)=>authenticateToken(req:Request, res;Response,next:NextFunction), async (req, res,) => {
    const { id } = req.body;
  
    try {
      const user = await userRepository.findOneBy({id:id});
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Utilisateur introuvable' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
  });

export function configureUserRoutes(app: Router) {
  app.use('/user', router);
}