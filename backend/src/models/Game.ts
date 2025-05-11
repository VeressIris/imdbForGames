import { InferSchemaType, Schema, model } from 'mongoose';

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  coverUrl: {
    type: String,
  },
  genres: {
    type: [String],
    default: [],
  },
  platforms: {
    type: [String],
  },
  stores: {
    type: [String],
  },
  totalNumberOfAchievements: {
    type: Number,
  },
});

export type GameType = InferSchemaType<typeof gameSchema>;
const Game = model('Game', gameSchema);

export default Game;
