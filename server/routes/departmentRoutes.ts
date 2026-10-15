import express, { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  deleteDepartment,
  updateDepartment,
} from '../controllers/departmentController.ts';
import { protect, admin } from '../middleware/authMiddleware.ts';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management and organization
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments (Paginated)
 *     tags: [Departments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of departments retrieved successfully
 *   post:
 *     summary: Create a new department (Admin only)
 *     tags: [Departments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Department already exists or invalid data
 *       403:
 *         description: Admin access required
 */
router.route('/')
  .post(protect, admin, createDepartment)
  .get(getAllDepartments);

/**
 * @swagger
 * /api/departments/{name}:
 *   get:
 *     summary: Get a single department by name
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name
 *     responses:
 *       200:
 *         description: Department details retrieved successfully
 *       404:
 *         description: Department not found
 *   patch:
 *     summary: Update an existing department (Admin only)
 *     tags: [Departments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Department not found
 *   delete:
 *     summary: Delete a department (Admin only)
 *     tags: [Departments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name
 *     responses:
 *       200:
 *         description: Department removed successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Department not found
 */
router
  .route('/:name')
  .get(getDepartment)
  .patch(protect, admin, updateDepartment)
  .delete(protect, admin, deleteDepartment);

export default router;