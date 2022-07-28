import asyncHandler from 'express-async-handler'
import Complaint from '../models/complaintModel.js'

// @desc    List of all complaints
// @route   POST /api/complaints
// @access  Public
const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({})

  res.json(complaints)
})

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private - User
const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, department } = req.body

  const complaint = await Complaint.create({
    title,
    description,
    department,
    createdBy: req.user._id
  })

  if (complaint) {
    res.status(201).json(complaint)
  } else {
    res.status(400)
    throw new Error('Invalid complaint data')
  }
})

// @desc    Update existing complaint
// @route   PATCH /api/complaints/id
// @access  Private - Admin only
const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)

  if (complaint) {
    complaint.title = req.body.title || complaint.title
    complaint.description = req.body.description || complaint.description
    complaint.department = req.body.department || complaint.department
    const updatedComplaint = await complaint.save()

    res.json(updatedComplaint)
  } else {
    res.status(404)
    throw new Error('Complaint not found')
  }
})

// @desc    Delete existing complaint
// @route   DELETE /api/complaints/id
// @access  Private - Admin or User
const deleteComplaint = asyncHandler(async (req, res) => {

  const complaint = await Complaint.findById(req.params.id)

  if (complaint) {
    await complaint.remove()
    res.json({ message: 'Complaint removed' })
  } else {
    res.status(404)
    throw new Error('Complaint not found')
  }
})

// @desc    Delete existing complaint
// @route   GET /api/complaints/id
// @access  Private - User or Admin
const getComplaint = asyncHandler(async (req, res) => {

  const complaint = await Complaint.findById(req.params.id)

  if (complaint) {
    res.json(complaint)
  } else {
    res.status(404)
    throw new Error('Complaint not found')
  }
})

export {
  getAllComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint
}
