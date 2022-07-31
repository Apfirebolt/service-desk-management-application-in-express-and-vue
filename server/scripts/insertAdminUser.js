import users from '../data/userData.js'
import User from "../models/userModel.js";
import connectDB from "./dbConnection.js" 

connectDB();

const importData = async () => {
  try {

    const createdUsers = await User.insertMany(users)

    if (createdUsers) {
      console.log('Data Imported!')
    }

    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importData()