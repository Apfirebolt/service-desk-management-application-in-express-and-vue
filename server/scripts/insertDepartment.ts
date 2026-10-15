import departments from '../data/departmentData.js';
import Department from '../models/department.ts';
import connectDB from '../config/db.ts';

connectDB();

const importData = async (): Promise<void> => {
  try {
    const createdDepartments = await Department.insertMany(departments);

    if (createdDepartments) {
      console.log('Department data imported!');
    }

    process.exit();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred while importing department data.');
    }
    process.exit(1);
  }
};

importData();