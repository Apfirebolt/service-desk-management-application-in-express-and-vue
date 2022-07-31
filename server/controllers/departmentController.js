import asyncHandler from 'express-async-handler'
import Department from '../models/departmentModel.js'

// @desc    List of all departments
// @route   POST /api/departments
// @access  Public
const getAllDepartments = asyncHandler(async (req, res) => {
  const itemsPerPage = 5;
  const startPage = req.query.page || 1;

  await Department.find({})
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, departments) {
      Department.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.status(200).json({
          data: departments,
          total: count,
          success: true,
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
})


// @desc    Create a department
// @route   POST /api/departments
// @access  Private - Admin only
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const departmentExists = await Department.findOne({ name })

  if (departmentExists) {
    res.status(400)
    throw new Error('Department already exists')
  }

  const department = await Department.create({
    name,
    description,
  })

  if (department) {
    res.status(201).json({
      _id: department._id,
      name: department.name,
      description: department.description,
    })
  } else {
    res.status(400)
    throw new Error('Invalid department data')
  }
})

// @desc    Update existing department
// @route   PATCH /api/departments/name
// @access  Private - Admin only
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findOne({ name: req.params.name })

  if (department) {
    department.name = req.body.name || department.name
    department.description = req.body.description || department.description
    
    const updatedDepartment = await department.save()

    res.json(updatedDepartment)
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})

// @desc    Delete existing department
// @route   DELETE /api/departments/name
// @access  Private - Admin only
const deleteDepartment = asyncHandler(async (req, res) => {

  const department = await Department.findOne({ name: req.params.name })

  if (department) {
    await department.remove()
    res.json({ message: 'Department removed' })
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})

// @desc    Delete existing department
// @route   GET /api/departments/name
// @access  Public
const getDepartment = asyncHandler(async (req, res) => {

  const department = await Department.findOne({ name: req.params.name })

  if (department) {
    res.json(department)
  } else {
    res.status(404)
    throw new Error('Department not found')
  }
})

export {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment
}
