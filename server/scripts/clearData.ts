import User from '../models/user.ts';
import Complaint from '../models/complaint.ts';
import Department from '../models/department.ts';
import connectDB from './dbConnection.ts';

connectDB();

const destroyData = async (): Promise<void> => {
  try {
    await Complaint.deleteMany();
    await Department.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred while destroying data.');
    }
    process.exit(1);
  }
};

destroyData();