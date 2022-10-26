const Post = require('../models/posts')
const User = require('../models/users')
const deleteFile = require('../utils/helper')
const path = require('path')
const rootDir = require('../utils/rootDir')

const getPostsController = async (req, res, next) => {
  const { page } = req.params

  try {
    const posts = await Post.find()
      .skip((page - 1) * 5)
      .limit(5)
      .populate('userId')

    return res.json(posts)
  } catch (error) {
    next(error)
  }
}

const getPostsPagesCountController = async (req, res, next) => {
  try {
    const numberOfDocuments = await Post.find().countDocuments()
    return res.json({ count: Math.ceil(numberOfDocuments / 5) })
  } catch (error) {
    next(error)
  }
}

const postAddPostsController = async (req, res, next) => {
  const { title, description, userId } = req.body

  const { file } = req

  let postId = ''

  // ? Some db operations
  const post = new Post({
    title,
    description,
    image: `${process.env.HOST}${file.path}`,
    imageName: file.originalname,
    userId
  })

  try {
    await post.save()

    postId = post?._id

    const user = await User.findById(userId)

    await user.addPost(postId)

    return res.status(201).json({
      message: 'post created successfully',
      content: {
        title,
        description,
        image: `${process.env.HOST}${file.path}`
      }
    })
  } catch (error) {
    next(error)
  }
}

const getPostController = async (req, res, next) => {
  const { _id } = req.params

  try {
    const post = await Post.findById(_id)

    if (post) {
      return res.json(post)
    }
    next(new Error('Post not Found.'))
  } catch (error) {
    next(error)
  }
}

const postEditPostController = async (req, res, next) => {
  const { _id } = req.params

  const { title, description } = req.body

  const { file } = req

  try {
    const post = await Post.findById(_id)

    if (post) {
      if (post?.userId === req?.userId) {
        deleteFile({ absUrl: path.join(rootDir, 'images', post.imageName) })

        await Post.findByIdAndUpdate(_id, {
          title,
          description,
          image: `${process.env.HOST}${file.path}`,
          imageName: file.originalname
        })

        return res.status(202).json({ message: 'Post Update Successful !' })
      }

      throw new Error('Unauthorized actions.')
    } else {
      const error = new Error('Post not found')
      error.customStatus = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
}

const deletePostController = async (req, res, next) => {
  const { _id } = req.params

  let postId = ''

  try {
    const post = await Post.findById(_id)

    if (post) {
      if (post?.userId === req?.userId) {
        postId = post?._id

        deleteFile({ absUrl: path.join(rootDir, 'images', post.imageName) })

        await post.delete()

        const user = await User.findById(req?.userId)

        await user.deletePost(postId)

        return res.json({ message: `Post id:${_id} deleted successfully.` })
      }

      throw new Error('Unauthorized actions.')
    } else {
      throw new Error('Post Not Found.')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPostsController,
  postAddPostsController,
  getPostController,
  postEditPostController,
  deletePostController,
  getPostsPagesCountController
}
