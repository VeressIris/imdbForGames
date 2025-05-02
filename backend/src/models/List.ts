import mongoose from 'mongoose';
import Game from './Game';
const { Schema, model } = mongoose;

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  games: { type: [Game], default: [] },
  createdBy: {
    username: {
      type: String,
      required: true,
    },
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favoritedBy: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const List = model('List', listSchema);

export default List;
