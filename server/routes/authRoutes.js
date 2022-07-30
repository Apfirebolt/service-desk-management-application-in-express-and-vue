import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerUser)
  .get(protect, getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)

export default router
