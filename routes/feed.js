const express = require('express')
const {
  getPostsController,
  postAddPostsController
} = require('../controllers/feed.controllers')
const { json } = require('body-parser')

const feedRoutes = express.Router()

//*  GET /feed/posts
feedRoutes.get('/posts', getPostsController)

//* POST /feed/add-post
feedRoutes.post('/add-post', json(), postAddPostsController)

module.exports = feedRoutes
