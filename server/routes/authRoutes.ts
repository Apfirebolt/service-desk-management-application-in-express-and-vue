import express, { Router } from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.ts';
import { protect, admin } from '../middleware/authMiddleware.ts';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [staff, user]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or invalid data
 *   get:
 *     summary: Get all users (Paginated)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: staff
 *         schema:
 *           type: boolean
 *         description: Filter staff users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
router.route('/')
  .post(registerUser)
  .get(protect, getAllUsers);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user & get token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', authUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Not authorized
 *   patch:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 */
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User removed successfully
 *       403:
 *         description: Only admin can delete a user account
 *       404:
 *         description: User not found
 */
router
  .route('/:id')
  .delete(protect, admin, deleteUser);

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Add a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created by admin successfully
 *       403:
 *         description: Admin access required
 */
router
  .route('/add')
  .post(protect, admin, registerUser);

export default router;