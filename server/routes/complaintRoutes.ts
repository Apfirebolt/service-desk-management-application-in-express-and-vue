import express, { Router } from 'express';
import {
  createComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getMyComplaints,
  getAssignedComplaints,
} from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Service desk complaint and ticket management
 */

/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - device
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               device:
 *                 type: string
 *                 enum: [Mobile, Laptop, Other Accessories]
 *               department:
 *                 type: string
 *                 description: Department ID
 *               managedBy:
 *                 type: string
 *                 description: Assigned User ID (Staff)
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *       400:
 *         description: Invalid complaint data
 *   get:
 *     summary: Get all complaints (Paginated)
 *     tags: [Complaints]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of complaints retrieved successfully
 */
router.route('/')
  .post(protect, createComplaint)
  .get(getAllComplaints);

/**
 * @swagger
 * /api/complaints/assigned-complaints:
 *   get:
 *     summary: Get complaints assigned to the logged-in staff/admin member
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of assigned complaints retrieved successfully
 *       401:
 *         description: Not authorized
 */
router
  .route('/assigned-complaints')
  .get(protect, getAssignedComplaints);

/**
 * @swagger
 * /api/complaints/my-complaints:
 *   get:
 *     summary: Get complaints created by the logged-in user
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's complaints retrieved successfully
 *       401:
 *         description: Not authorized
 */
router
  .route('/my-complaints')
  .get(protect, getMyComplaints);

/**
 * @swagger
 * /api/complaints/{id}:
 *   get:
 *     summary: Get a single complaint by ID
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint ID
 *     responses:
 *       200:
 *         description: Complaint details retrieved successfully
 *       403:
 *         description: Only complaint owner and admin can view complaints
 *       404:
 *         description: Complaint not found
 *   patch:
 *     summary: Update an existing complaint
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               device:
 *                 type: string
 *                 enum: [Mobile, Laptop, Other Accessories]
 *               department:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Opened, Pending, Closed]
 *               managedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 *       403:
 *         description: Forbidden action
 *       404:
 *         description: Complaint not found
 *   delete:
 *     summary: Delete a complaint
 *     tags: [Complaints]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint ID
 *     responses:
 *       200:
 *         description: Complaint removed successfully
 *       403:
 *         description: Only owner or admin can delete complaint
 *       404:
 *         description: Complaint not found
 */
router
  .route('/:id')
  .get(protect, getComplaint)
  .patch(protect, updateComplaint)
  .delete(protect, deleteComplaint);

export default router;