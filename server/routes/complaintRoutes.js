import express from 'express'
const router = express.Router()
import {
  createComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getMyComplaints
} from '../controllers/complaintController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, createComplaint)
  .get(getAllComplaints)
router
  .route('/:id')
  .get(protect, getComplaint)
  .patch(protect, updateComplaint)
  .delete(protect, deleteComplaint)
router
  .route('/my-complaints')
  .get(protect, getMyComplaints)


export default router
