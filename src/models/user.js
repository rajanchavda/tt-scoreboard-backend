const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema =  new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  },
  role: {
    type: String
  },
  tokens: [{
    token: {
      type: String,
      required: true,
      _id: false
    }
  }]
})


userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'thisisrandomstring');
  return token;
}


userSchema.statics.findByCredentials = async (username, password) => {

  const user = await User.findOne({ username })

  if(!user) {
    throw Error('Unable to login')
  }

  const isMatchPass = bcrypt.compareSync(password, user.password)

  if(!isMatchPass) {
    throw Error('Unable to login')
  }

  return user
}


userSchema.pre('save', async function(next) {
  const user = this
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


const User = mongoose.model('User', userSchema)

module.exports = User;
