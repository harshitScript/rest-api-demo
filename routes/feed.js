const express = require("express");
const {
  getPostsController,
  postAddPostsController,
} = require("../controllers/feed.controllers");
const { json } = require("body-parser");
const {
  schema: create_post_schema,
  validatorMiddleware,
} = require("../Validations/create-post-schema");

const feedRoutes = express.Router();

//*  GET /feed/posts
feedRoutes.get("/posts", getPostsController);

//* POST /feed/add-post
feedRoutes.post(
  "/add-post",
  json(),
  create_post_schema,
  validatorMiddleware,
  postAddPostsController
);

module.exports = feedRoutes;
