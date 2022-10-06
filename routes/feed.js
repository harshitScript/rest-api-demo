const express = require('express')
const { getPostsController } = require('../controllers/feed.controllers')

const feedRoutes = express.Router()

//*  GET /feed/posts
feedRoutes.get('/posts', getPostsController)

module.exports = feedRoutes
