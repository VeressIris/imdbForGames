import { InferSchemaType, Schema, model } from 'mongoose';

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  coverUrl: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  timeToBeat: {
    type: {
      mainStory: {
        type: Number,
        required: true,
      },
      mainPlusExtra: {
        type: Number,
        required: true,
      },
      completionist: {
        type: Number,
        required: true,
      },
    },
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
  stores: {
    type: {
      type: String,
      enum: ['Steam', 'Playstation Store', 'Epic Games Store', 'Xbox Store'],
    },
    required: true,
  },
  totalNumberOfAchievements: {
    type: Number,
  },
});

export type GameType = InferSchemaType<typeof gameSchema>;
const Game = model('Game', gameSchema);

export default Game;
