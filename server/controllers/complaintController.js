import asyncHandler from 'express-async-handler'
import Complaint from '../models/complaintModel.js'

// @desc    List of all complaints
// @route   POST /api/complaints
// @access  Public
const getAllComplaints = asyncHandler(async (req, res) => {
  const itemsPerPage = 5;
  const startPage = req.query.page || 1;

  await Complaint.find({})
    .populate('managedBy', 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, complaints) {
      Complaint.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.status(200).json({
          data: complaints,
          total: count,
          success: true,
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
})


// @desc    List of all user complaints
// @route   POST /api/complaints/my-complaints
// @access  Public
const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ createdBy: req.user._id })
  .populate('managedBy', 'firstName lastName')

  res.json(complaints)
})

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private - User
const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, department, device, status, managedBy } = req.body

  const complaint = await Complaint.create({
    title,
    description,
    department,
    device,
    status,
    createdBy: req.user._id,
    managedBy,
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
  const complaint = await Complaint.findOne({ _id: req.params.id })

  if (complaint && complaint.managedBy) {
    if ((complaint.managedBy.toString() !== req.user._id.toString()) && (complaint.createdBy.toString() !== req.user._id.toString())) {
      res.status(403)
      throw new Error('This complaint is not assigned to')
    }
  }

  if (complaint && (complaint.createdBy.toString() !== req.user._id.toString() 
                && (complaint.managedBy.toString() !== req.user._id.toString())) 
                && (req.user.isAdmin === false)) {
    res.status(403)
    throw new Error('Only complaint owner or admin can edit complaint')
  }

  if (complaint) {
    complaint.title = req.body.title || complaint.title
    complaint.description = req.body.description || complaint.description
    complaint.device= req.body.device || complaint.device
    complaint.department = req.body.department || complaint.department
    complaint.status = req.body.status || complaint.status
    complaint.managedBy = req.body.managedBy || complaint.managedBy
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
 
  if ((complaint.createdBy.toString() !== req.user._id.toString()) && (req.user.isAdmin === false)) {
    res.status(403)
    throw new Error('Only complaint owner or admin can delete complaint')
  }

  if (complaint) {
    await complaint.remove()
    res.json({ message: 'Complaint removed' })
  } else {
    res.status(404)
    throw new Error('Complaint not found')
  }
})

// @desc    Get existing complaint
// @route   GET /api/complaints/id
// @access  Private - User or Admin
const getComplaint = asyncHandler(async (req, res) => {

  const complaint = await Complaint.findById(req.params.id)

  if ((complaint.createdBy.toString() !== req.user._id.toString()) && (req.user.isAdmin === false)) {
    res.status(403)
    throw new Error('Only complaint owner and admin can view complaints')
  }

  if (complaint) {
    res.json(complaint)
  } else {
    res.status(404)
    throw new Error('Complaint not found')
  }
})

// @desc    List of all assigned complaints
// @route   POST /api/complaints/assigned-complaints
// @access  Private - Admin and staff users
const getAssignedComplaints = asyncHandler(async (req, res) => {

  const itemsPerPage = 5;
  const startPage = req.query.page || 1;

  await Complaint.find({ managedBy: req.user._id })
    .populate('managedBy', 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, complaints) {
      Complaint.countDocuments({ managedBy: req.user._id }).exec(function (err, count) {
        if (err) return next(err);
        res.status(200).json({
          data: complaints,
          total: count,
          success: true,
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
})

export {
  getAllComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
  getMyComplaints,
  getAssignedComplaints
}
