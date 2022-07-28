import express from 'express'
const router = express.Router()
import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  deleteDepartment,
  updateDepartment
} from '../controllers/departmentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, admin, createDepartment)
  .get(getAllDepartments)

router
  .route('/:name')
  .get(getDepartment)
  .patch(protect, admin, updateDepartment)
  .delete(protect, admin, deleteDepartment)

export default router
