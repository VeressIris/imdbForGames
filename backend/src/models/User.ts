import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  steamId: {
    type: String,
    required: false,
  },
  createdLists: {
    type: [Schema.Types.ObjectId],
    ref: 'List',
    default: [],
  },
  savedLists: {
    type: [Schema.Types.ObjectId],
    ref: 'List',
    default: [],
  },
});

const User = model('User', userSchema);

export default User;
