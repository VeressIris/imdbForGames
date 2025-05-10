import mongoose from 'mongoose';
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
  games: {
    type: [
      {
        gameId: Schema.Types.ObjectId, // -> Game model
        gameName: String,
      },
    ],
    default: [],
  },
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
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const List = model('List', listSchema);

export default List;
