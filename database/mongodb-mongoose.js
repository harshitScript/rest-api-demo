const mongoose = require('mongoose')

const connectMongo = () => {
  return mongoose.connect(process.env.MONGODB_URI)
}

module.exports = connectMongo
