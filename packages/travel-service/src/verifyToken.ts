import { Request, Response, NextFunction } from "express";

async function verifyTokenRemotely(token : string) {
    try {
        const response = await fetch('http://localhost:4000/verify', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
        });

        if (response.status === 200) {
            return response.json();
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export function verifyTokenMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Any token found' });
  }

  verifyTokenRemotely(token)
    .then((responseUser) => {
      if(responseUser) {
        req.user = responseUser
        next();
      } else {
        res.status(403).json({ message: 'Wrong token' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    });
}

// export async function verifyPermissions(req: Request, res: Response, next: NextFunction) {
//   const token = String(req.header('Authorization'));
//   try {
//     const response = await fetch('http://localhost:4000/verifyPermissions', {
//     method: 'GET',
//     headers: {
//         'Authorization': token,
//     },
//     });
//     if(response.status === 200) { 
//       req.user = user;
//       next();
//     }
//     else { res.status(403).json({ message: 'Not allowed' }); }
// } catch (error) {
//     console.error(error);
//     res.status(403).json({ message: 'Something went wrong' });
// }
// }

// export function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Accès non autorisé' });
//   }

//   jwt.verify(token, 'votre_secret', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Token invalide' });
//     }
//     req.user = user;
//     next();
//   });
// }

