import mongoose from "mongoose";
import User from "../models/userModel.js";
import Complaint from "../models/complaintModel.js";
import Department from "../models/departmentModel.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/service-desk", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const destroyData = async () => {
  try {
    await Complaint.deleteMany();
    await Department.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

destroyData();
