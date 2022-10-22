const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: 'posts',
      required: true
    }
  },
  { timestamps: true }
)

userSchema.methods.addPost = function (postId) {
  const { posts } = this

  const newPosts = [postId, ...posts]

  this.posts = newPosts

  return this.save()
}

module.exports = mongoose.model('user', userSchema)
