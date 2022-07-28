import express from 'express'
const router = express.Router()
import {
  createComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint
} from '../controllers/complaintController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, createComplaint)
  .get(getAllComplaints)
router
  .route('/:id')
  .get(protect, getComplaint)
  .put(protect, updateComplaint)
  .delete(protect, deleteComplaint)

export default router
