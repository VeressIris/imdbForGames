import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from './utils';
dotenv.config();

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
