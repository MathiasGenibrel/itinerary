import { Router } from 'express';
import { loginController, registerController } from '../controller/controllerLoginController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Authentication
 *     description: Allows a user to authenticate and receive a valid JWT token if successful.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Authentication successful. Returns a JWT token.
 *       401:
 *         description: Incorrect credentials.
 *       500:
 *         description: Error during authentication.
 */
router.post('/login', loginController);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a User
 *     description: Creates a new user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: User's username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User created successfully.
 *       500:
 *         description: Error during user creation.
 */
router.post('/register', registerController);


export function configureAuthRoutes(app: Router) {
  app.use('/', router);
}