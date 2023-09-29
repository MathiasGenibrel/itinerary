import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from './../entities/User';

const key_token = `${process.env.TOKEN}`;
const verifyToken = jwt.verify;

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

function generateToken(user: User) {
    const payload = {
        id: user.id,
        email: user.email,
      };
    
      const token = jwt.sign(payload, key_token, {
        expiresIn: '1h',
      });
    
      return token;
}

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
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
}

export { generateToken, authenticateToken };
