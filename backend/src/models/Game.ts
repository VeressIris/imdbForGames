import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  coverUrl: {
    type: String,
    required: false,
  },
  genres: [String],
  platforms: [String],
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Game = model('Game', gameSchema);

export default Game;
