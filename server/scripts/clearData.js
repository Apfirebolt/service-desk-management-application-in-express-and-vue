import User from "../models/userModel.js";
import Complaint from "../models/complaintModel.js";
import Department from "../models/departmentModel.js";
import connectDB from "./dbConnection" 

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
