import express from 'express';
import "reflect-metadata";
import { DataSource } from "typeorm"
import { User } from './entities/User';

const bcrypt = require('bcrypt');
const { promisify } = require('util');
const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const verifyToken = promisify(jwt.verify);
const key_token = "fezujvjifoezjfnfklnbhrkp"; 
const saltRounds = 10;

app.use(express.json());

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './mydb.sqlite',
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

const authenticateToken = async (req : any, res: any, next: any) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token JWT manquant' });
  }
  
  try {
    const decoded = await verifyToken(token, key_token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token JWT invalide' });
  }
};


// Créez un utilisateur
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
    res.json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
});

// Authentification de l'utilisateur
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

// Obtenir le profil de l'utilisateur
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

// Mettre à jour l'utilisateur
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

// Supprimer l'utilisateur
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

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});

