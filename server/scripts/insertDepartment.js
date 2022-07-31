import departments from '../data/departmentData.js'
import Department from "../models/departmentModel.js";
import connectDB from "./dbConnection.js" 

connectDB();

const importData = async () => {
  try {

    const createdDepartments = await Department.insertMany(departments)

    if (createdDepartments) {
      console.log('Department data imported!')
    }

    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importData()