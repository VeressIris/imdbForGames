import { InferSchemaType, Schema, model } from 'mongoose';

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    // required: true,
  },
  coverUrl: {
    type: String,
    // required: true,
  },
  genres: {
    type: [String],
    // required: true,
  },
  platforms: {
    type: [String],
    enum: ['PC', 'PS5', 'Xbox', 'Switch', 'PS4', 'PS3'],
    // required: true,
  }, // ex: ['PC', 'PS5', 'Xbox']
  store: [String], // ex: ['Steam', 'Epic Games', 'Playstation Store'] - the store from which the user got the games
  releaseDate: {
    type: Date,
    // required: true,
  },
  steamId: {
    type: String,
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
