const express = require('express')
const router = new express.Router()

const Game = require('../models/game');
const { SOCKET_EVENTS } = require('../socket.io/socketio');


// Create new game
router.post('/game/newGame', async (req, res) => {
  const game = new Game();

  try {
    await game.save()
    res.send(game);
  } catch (error) {
    res.status(500).send(error.message || e);
  }
})


// Get All
router.get('/game/getAll', async (req, res) => {
  try {
    const games = await Game.find({})
    res.send(games);
  } catch (error) {
    res.status(500).send(error.message || e);
  }
})

// Update game states
// ?player=player1
// body : {
//    "name": "Akki"
// }
router.post('/game/update/:gameId', async (req, res) => {
  const { player } = req.query
  const { gameId } = req.params

  const userQueryFields = Object.keys(req.body)

  const updateObj = {}

  userQueryFields.forEach(element => {
    const property = `${player}.${element}`
    updateObj[property] = req.body[element]
  });

  try {
    const game = await Game.findOneAndUpdate({ _id: gameId }, {
      $set: updateObj
    }, { new: true })

    res.header("Access-Control-Allow-Origin", "*");

    req.io.emit(SOCKET_EVENTS.GAME_UPDATE, {
      event: SOCKET_EVENTS.GAME_UPDATE,
      payload: game
    });

    res.send(game);
  } catch (error) {
    res.status(500).send(error.message || e);
  }
})


module.exports = router


