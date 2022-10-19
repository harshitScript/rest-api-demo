const Post = require('../models/posts')
const deleteFile = require('../utils/helper')
const path = require('path')
const rootDir = require('../utils/rootDir')

const getPostsController = (req, res, next) => {
  const { page } = req.params

  const failureCallback = (error) => {
    next(error)
  }

  const successCallback = (posts) => {
    return res.json(posts)
  }

  Post.find()
    .skip((page - 1) * 5)
    .limit(5)
    .then(successCallback)
    .catch(failureCallback)
}

const getPostsPagesCountController = (req, res, next) => {
  const failureCallback = (error) => {
    next(error)
  }

  const successCallback = (numberOfDocuments) => {
    return res.json({ count: Math.ceil(numberOfDocuments / 5) })
  }

  Post.find().countDocuments().then(successCallback).catch(failureCallback)
}

const postAddPostsController = (req, res, next) => {
  const { title, description } = req.body

  const successCallback = () => {
    return res.status(201).json({
      message: 'post created successfully',
      content: {
        title,
        description,
        image: `${process.env.HOST}${file.path}`
      }
    })
  }

  const failureCallback = (error) => {
    next(error)
  }

  // ? Some db operations
  const post = new Post({
    title,
    description,
    image: `${process.env.HOST}${file.path}`,
    imageName: file.originalname,
    userId: {
      username: 'hScript',
      userImage: `${process.env.HOST}images/user/test.jpg`
    }
  })

  post.save().then(successCallback).catch(failureCallback)
}

const getPostController = (req, res, next) => {
  const { _id } = req.params

  const failureCallback = (error) => {
    next(error)
  }

  const successCallback = (post) => {
    if (post) {
      return res.json(post)
    }
    next(new Error('Post not Found.'))
  }

  Post.findById(_id).then(successCallback).catch(failureCallback)
}

const postEditPostController = (req, res, next) => {
  const { _id } = req.params

  const { title, description } = req.body
  const { file } = req

  const failureCallback = (error) => {
    next(error)
  }

  const postUpdater = (post) => {
    if (post) {
      deleteFile({ absUrl: path.join(rootDir, 'images', post.imageName) })

      return Post.findByIdAndUpdate(_id, {
        title,
        description,
        image: `${process.env.HOST}${file.path}`,
        imageName: file.originalname
      })
    } else {
      const error = new Error('Post not found')
      error.customStatus = 404
      next(error)
    }
  }

  const successCallback = () => {
    return res.status(202).json({ message: 'Post Update Successful !' })
  }

  Post.findById(_id)
    .then(postUpdater)
    .then(successCallback)
    .catch(failureCallback)
}

const deletePostController = (req, res, next) => {
  const { _id } = req.params

  const failureCallback = (error) => {
    next(error)
  }

  const successCallback = () => {
    return res.json({ message: `Post id:${_id} deleted successfully.` })
  }

  const deletePost = (post) => {
    if (post) {
      deleteFile({ absUrl: path.join(rootDir, 'images', post.imageName) })

      return post.delete()
    } else {
      throw new Error('Post Not Found.')
    }
  }

  Post.findById(_id)
    .then(deletePost)
    .then(successCallback)
    .catch(failureCallback)
}

module.exports = {
  getPostsController,
  postAddPostsController,
  getPostController,
  postEditPostController,
  deletePostController,
  getPostsPagesCountController
}
