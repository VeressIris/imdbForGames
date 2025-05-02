import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
 
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }
  mongoose.connect(process.env.MONGODB_URI);
});
