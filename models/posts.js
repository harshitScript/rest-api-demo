const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('posts', postSchema)
