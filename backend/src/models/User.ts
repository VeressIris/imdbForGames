import mongoose from 'mongoose';
import Game from './Game';
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
  psnId: {
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
  ownedGames: {
    type: [Game],
    ref: 'Game',
    default: [],
  },
  favoriteGames: {
    type: [Game],
    ref: 'Game',
    default: [],
  },
  wishlistedGames: {
    type: [Game],
    ref: 'Game',
    default: [],
  },
});

const User = model('User', userSchema);

export default User;
