const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.DB_URI)
} catch (error) {
  throw new Error(error)
}