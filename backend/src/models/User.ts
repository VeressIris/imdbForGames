import { userGameSchema } from './UserGame';
import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  clerkId: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
  },
  psnId: {
    type: String,
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
    type: [userGameSchema],
    default: [],
  },
  favoriteGames: {
    type: [
      {
        gameId: Schema.Types.ObjectId, // -> Game model
        gameName: String,
      },
    ],
    default: [],
  },
  wishlistedGames: {
    type: [
      {
        gameId: Schema.Types.ObjectId, // -> Game model
        gameName: String,
      },
    ],
    default: [],
  },
});

export type UserType = InferSchemaType<typeof userSchema>;
const User = model('User', userSchema);

export default User;
