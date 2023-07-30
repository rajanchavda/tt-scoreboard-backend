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
  },
  settings: {
    gameType: {
      type: String, // SINGLES,  DOUBLES
      required: true,
      enum: ['SINGLES', 'DOUBLES'],
      default: 'SINGLES'
    },
    winPoints: {
      singles: { // 11
        type: Number,
        required: true,
        default: 11
      },
      doubles: { // 21
        type: Number,
        required: true,
        default: 21
      }
    }
  }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;