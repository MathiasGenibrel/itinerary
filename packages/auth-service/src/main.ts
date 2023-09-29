import express from 'express';
import "reflect-metadata";
import { DataSource } from "typeorm"
import { User } from './entities/User';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const verifyToken = jwt.verify;
const key_token = `${process.env.TOKEN}`; 
const saltRounds = 10;

const corsOptions = {
  origin: process.env.CORSORIGIN, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `./${process.env.DBNAME}`,
  entities: [User],
  synchronize: true,
})

AppDataSource.initialize()
    .catch((error) => console.log(error))

const userRepository = AppDataSource.getRepository(User)

function generateToken(user : User) {
  const payload = {
    id: user.id,
    email: user.email,
    // Vous pouvez également ajouter d'autres informations à inclure dans le JWT
  };

  const token = jwt.sign(payload, key_token, {
    expiresIn: '1h', // Optionnel : définir la durée de validité du token
  });

  return token;
}

import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    user: User;
  }
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token JWT manquant' });
  }
  
  try {
    const decoded = await verifyToken(token, key_token);
    req.user = decoded as User;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token JWT invalide' });
  }
};



/**
 * @swagger
 * /register:
 *   post:
 *     description: Créez un utilisateur
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Adresse e-mail de l'utilisateur
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Nom d'utilisateur de l'utilisateur
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Mot de passe de l'utilisateur
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User();
  user.email = email;
  user.username = username;
  user.password = hashedPassword;

  try {
    await userRepository.save(user);
    res.status(201);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     description: Permet à un utilisateur de s'authentifier et de recevoir un token JWT s'il est valide.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Adresse e-mail de l'utilisateur.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Mot de passe de l'utilisateur.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Authentification réussie. Renvoie un token JWT.
 *       401:
 *         description: Identifiants incorrects.
 *       500:
 *         description: Erreur lors de l'authentification.
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ email:email, password:password });

    if (!user) {
      res.status(401).json({ message: 'Identifiants incorrects' });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user);
        res.json({ id: user.id, email: user.email, username: user.username, token });
      } else {
        res.status(401).json({ message: 'Identifiants incorrects' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'authentification' });
  }
});

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
app.get('/profil', authenticateToken, async (req, res) => {
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

/**
 * @swagger
 * /profil/updateUser:
 *   put:
 *     summary: Mettre à jour l'utilisateur
 *     description: Met à jour les informations de l'utilisateur authentifié en utilisant un token JWT valide.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - name: email
 *         description: Nouvelle adresse e-mail de l'utilisateur.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Nouveau nom d'utilisateur de l'utilisateur.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Nouveau mot de passe de l'utilisateur.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       401:
 *         description: Token JWT invalide ou manquant.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur lors de la mise à jour de l'utilisateur.
 */
app.put('/profil/updateUser', authenticateToken, async (req, res) => {
  const { id } = req.body;
  const { email, username, password } = req.body;

  try {
    const user = await userRepository.findOneBy({id:id});

    if (user) {
      user.email = email;
      user.username = username;
      user.password = password;

      await userRepository.save(user);
      res.json({ message: 'Utilisateur mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

/**
 * @swagger
 * /profil/deleteUser:
 *   delete:
 *     summary: Supprimer l'utilisateur
 *     description: Supprime l'utilisateur authentifié en utilisant un token JWT valide.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       401:
 *         description: Token JWT invalide ou manquant.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur.
 */
app.delete('/profil/deleteUser', authenticateToken, async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userRepository.findOneBy({id:id});

    if (user) {
      await userRepository.remove(user);
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

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

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});

