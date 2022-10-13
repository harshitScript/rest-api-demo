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
    userId: {
      type: {
        username: {
          type: String,
          required: true
        },
        userImage: {
          type: String,
          required: true
        }
      },
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('posts', postSchema)
