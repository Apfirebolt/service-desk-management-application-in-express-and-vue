import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  description: string;
  department?: mongoose.Types.ObjectId;
  createdBy?: mongoose.Types.ObjectId;
  status: 'Opened' | 'Pending' | 'Closed';
  device: 'Mobile' | 'Laptop' | 'Other Accessories';
  managedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
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
      required: false,
    },
    device: {
      type: String,
      enum: ['Mobile', 'Laptop', 'Other Accessories'],
      required: true,
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
);

const Complaint = mongoose.model<IComplaint>('Complaint', complaintSchema);

export default Complaint;