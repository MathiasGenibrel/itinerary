import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

const verifyToken = jwt.verify;
const key_token = `${process.env.TOKEN}`;

declare global {
  namespace Express {
    interface Request {
      user?: User; // Declare the 'user' property on the Request object
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  
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
