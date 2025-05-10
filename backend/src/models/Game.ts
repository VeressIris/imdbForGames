import { InferSchemaType, Schema, model } from 'mongoose';

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coverUrl: {
    type: String,
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
    required: true,
  },
  totalNumberOfAchievements: {
    type: Number,
    required: true,
  },
  playingStatus: {
    type: String,
    enum: ['playing', 'finished', 'not started', '100%'],
    default: 'not started',
    required: true,
  },
});

export type GameType = InferSchemaType<typeof gameSchema>;
const Game = model('Game', gameSchema);

export default Game;
