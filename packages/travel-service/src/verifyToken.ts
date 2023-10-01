import { NextFunction } from "express";

async function verifyTokenRemotely(token : string) {
    try {
        const response = await fetch('http://localhost:4000/verify', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export function verifyTokenMiddleware(req : any, res : any, next : NextFunction) {
  const token = req.headers('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Any token found' });
  }

  verifyTokenRemotely(token)
    .then((isTokenValid) => {
      if (isTokenValid) {
        next();
      } else {
        res.status(403).json({ message: 'wrong token' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    });
}

