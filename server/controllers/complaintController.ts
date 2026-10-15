import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Complaint from '../models/complaint.ts';

interface AuthRequest extends Request {
  user?: {
    _id: any;
    isAdmin: boolean;
    [key: string]: any;
  };
}

// @desc    List of all complaints
// @route   GET /api/complaints
// @access  Public
const getAllComplaints = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const itemsPerPage = 5;
  const startPage = parseInt(req.query.page as string) || 1;

  const count = await Complaint.countDocuments({});
  const complaints = await Complaint.find({})
    .populate('managedBy', 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage);

  res.status(200).json({
    data: complaints,
    total: count,
    success: true,
    itemsPerPage,
    startPage,
    lastPage: Math.ceil(count / itemsPerPage),
  });
});

// @desc    List of all user complaints
// @route   GET /api/complaints/my-complaints
// @access  Private
const getMyComplaints = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const complaints = await Complaint.find({ createdBy: req.user._id })
    .populate('managedBy', 'firstName lastName');

  res.json(complaints);
});

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private - User
const createComplaint = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const { title, description, department, device, status, managedBy } = req.body;

  const complaint = await Complaint.create({
    title,
    description,
    department,
    device,
    status,
    createdBy: req.user._id,
    managedBy,
  });

  if (complaint) {
    res.status(201).json(complaint);
  } else {
    res.status(400);
    throw new Error('Invalid complaint data');
  }
});

// @desc    Update existing complaint
// @route   PATCH /api/complaints/:id
// @access  Private - Admin or Owner/Manager
const updateComplaint = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const complaint = await Complaint.findOne({ _id: req.params.id });

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (complaint.managedBy) {
    if (
      complaint.managedBy.toString() !== req.user._id.toString() &&
      complaint.createdBy.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error('This complaint is not assigned to you');
    }
  }

  if (
    complaint.createdBy.toString() !== req.user._id.toString() &&
    (!complaint.managedBy || complaint.managedBy.toString() !== req.user._id.toString()) &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error('Only complaint owner or admin can edit complaint');
  }

  complaint.title = req.body.title || complaint.title;
  complaint.description = req.body.description || complaint.description;
  complaint.device = req.body.device || complaint.device;
  complaint.department = req.body.department || complaint.department;
  complaint.status = req.body.status || complaint.status;
  complaint.managedBy = req.body.managedBy || complaint.managedBy;

  const updatedComplaint = await complaint.save();
  res.json(updatedComplaint);
});

// @desc    Delete existing complaint
// @route   DELETE /api/complaints/:id
// @access  Private - Admin or User
const deleteComplaint = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (
    complaint.createdBy.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error('Only complaint owner or admin can delete complaint');
  }

  await complaint.deleteOne();
  res.json({ message: 'Complaint removed' });
});

// @desc    Get existing complaint
// @route   GET /api/complaints/:id
// @access  Private - User or Admin
const getComplaint = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (
    complaint.createdBy.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error('Only complaint owner and admin can view complaints');
  }

  res.json(complaint);
});

// @desc    List of all assigned complaints
// @route   GET /api/complaints/assigned-complaints
// @access  Private - Admin and staff users
const getAssignedComplaints = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const itemsPerPage = 5;
  const startPage = parseInt(req.query.page as string) || 1;

  const count = await Complaint.countDocuments({ managedBy: req.user._id });
  const complaints = await Complaint.find({ managedBy: req.user._id })
    .populate('managedBy', 'firstName lastName')
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage);

  res.status(200).json({
    data: complaints,
    total: count,
    success: true,
    itemsPerPage,
    startPage,
    lastPage: Math.ceil(count / itemsPerPage),
  });
});

export {
  getAllComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
  getMyComplaints,
  getAssignedComplaints,
};