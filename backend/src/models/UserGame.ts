import { InferSchemaType, Schema, model } from 'mongoose';

const userGameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coverUrl: {
    type: String,
    required: true,
  },
  coreGame: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  platforms: {
    type: [
      {
        type: String,
        enum: ['PC', 'PS5', 'PS4', 'PS3', 'Xbox', 'Switch'],
      },
    ],
    required: true,
  },
  store: {
    type: {
      type: String,
      enum: ['Steam', 'Playstation Store', 'Epic Games Store', 'Xbox Store'],
    },
    required: true,
  },
  earnedAchievements: {
    type: Number,
  },
  totalNumberOfAchievements: {
    type: Number,
  },
  playingStatus: {
    type: String,
    enum: ['playing', 'finished', 'not started', '100%'],
    default: 'not started',
  },
});

export type GameType = InferSchemaType<typeof userGameSchema>;
const UserGame = model('UserGame', userGameSchema);

export default UserGame;
