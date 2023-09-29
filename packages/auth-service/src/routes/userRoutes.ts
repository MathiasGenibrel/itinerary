import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { profileController, profileDeleteController, profileUpdateController } from '../controller/controllerAuthController';

const router = Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile of the authenticated user using a valid JWT token.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *       401:
 *         description: Invalid or missing JWT token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error while retrieving the profile.
 */
router.get("/profile", authenticateToken, profileController);

/**
 * @swagger
 * /profile/updateUser:
 *   put:
 *     summary: Update user
 *     description: Updates the information of the authenticated user using a valid JWT token.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - name: email
 *         description: New email address of the user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: New username of the user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: New password of the user.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       401:
 *         description: Invalid or missing JWT token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error while updating the user.
 */
router.put('/profile/updateUser', authenticateToken, profileUpdateController);

/**
 * @swagger
 * /profile/deleteUser:
 *   delete:
 *     summary: Delete user
 *     description: Deletes the authenticated user using a valid JWT token.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Invalid or missing JWT token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error while deleting the user.
 */
router.delete('/profile/deleteUser', authenticateToken, profileDeleteController);

export function configureUserRoutes(app: Router) {
  app.use('/', router);
}