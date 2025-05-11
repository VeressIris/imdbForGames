import { InferSchemaType, Schema, model } from 'mongoose';

export const userGameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
    },
    coreGame: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    store: {
      type: String,
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
  },
  {
    _id: false,
  },
);

// export type UserGameType = InferSchemaType<typeof userGameSchema>;
// const UserGame = model('UserGame', userGameSchema);

// export default UserGame;
