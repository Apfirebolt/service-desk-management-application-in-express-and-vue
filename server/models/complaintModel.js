import mongoose from 'mongoose'

const complaintSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ['Opened', 'Pending', 'Closed'],
      default: 'Pending',
      required : false 
    },
    device: {
      type: String,
      enum: ['Mobile', 'Laptop', 'Other Accessories'],
      required : true 
    },
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Complaint = mongoose.model('Complaint', complaintSchema)

export default Complaint
