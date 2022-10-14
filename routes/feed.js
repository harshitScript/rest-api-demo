const express = require("express");
const {
  getPostsController,
  postAddPostsController,
  getPostController,
  postEditPostController,
} = require("../controllers/feed.controllers");
const { json } = require("body-parser");
const {
  schema: create_post_schema,
  validatorMiddleware,
} = require("../Validations/create-post-schema");
const postsMulter = require("../multer/multer.config.posts");

const feedRoutes = express.Router();

//*  GET /feed/posts
feedRoutes.get("/posts", getPostsController);

//* POST /feed/add-post
feedRoutes.post(
  "/add-post",
  postsMulter.single("image"),
  create_post_schema,
  validatorMiddleware,
  postAddPostsController
);

//* GET /feed/post/:_id
feedRoutes.get("/post/:_id", getPostController);

//* POST /feed/edit-post/:_id
feedRoutes.post(
  "/edit-post/:_id",
  postsMulter.single("image"),
  postEditPostController
);

module.exports = feedRoutes;
