import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
    modelName: 'users',
    additionalFields: {
      description: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
      psnId: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
    },
    fields: {
      name: 'username',
      image: 'imageUrl',
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
