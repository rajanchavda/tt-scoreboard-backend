const express = require('express')

const router = new express.Router()

const User = require('../models/user')


// Create user
router.post('/users/createUser', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = user.generateAuthToken();
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token })
  } catch (error) {
    res.status(500).send(error.message || e)
  }
})


// Login user
router.post('/users/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findByCredentials(username, password);
    console.log(user);
    const token = await user.generateAuthToken()

    user.tokens = user.tokens.concat({ token })
    await user.save()

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message || e)
  }
})


module.exports = router
