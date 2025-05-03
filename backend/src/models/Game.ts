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
  platforms: {
    type: [String],
    required: true,
  }, // ex: ['PC', 'PS5', 'Xbox']
  store: [String], // ex: ['Steam', 'Epic Games', 'Playstation Store'] - the store from which the user got the games
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Game = model('Game', gameSchema);

export default Game;
