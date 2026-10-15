import users from '../data/userData.ts';
import User from '../models/user.ts';
import connectDB from '../config/db.ts';

connectDB();

const importData = async (): Promise<void> => {
  try {
    const createdUsers = await User.insertMany(users);

    if (createdUsers) {
      console.log('Data Imported!');
    }

    process.exit();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred while importing data.');
    }
    process.exit(1);
  }
};

importData();