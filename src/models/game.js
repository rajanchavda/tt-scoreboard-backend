const mongoose = require('mongoose');

const scoreSchema = {
  type: Number,
  default: 0,
  min: 0
}

const gameSchema = new mongoose.Schema({
  status: {
    type: String,
    trim: true
  },
  player1: {
    name: {
      type: String,
      default: 'Player 1',
      trim: true
    },
    score: scoreSchema
  },
  player2: {
    name: {
      type: String,
      default: 'Player 2',
      trim: true
    },
    score: scoreSchema
  },
  result: {
    type: String
  }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;