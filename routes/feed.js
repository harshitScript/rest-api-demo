const express = require("express");
const {
  getPostsController,
  postAddPostsController,
  getPostController,
  postEditPostController,
  deletePostController,
  getPostsPagesCountController,
} = require("../controllers/feed.controllers");
const {
  schema: create_post_schema,
  validatorMiddleware,
} = require("../Validations/create-post-schema");
const postsMulter = require("../multer/multer.config.posts");

const feedRoutes = express.Router();

//*  GET /feed/posts
feedRoutes.get("/posts/:page", getPostsController);

//* GET /feed/posts-pages-count
feedRoutes.get("/posts-pages-count", getPostsPagesCountController);

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

//* PUT /feed/edit-post/:_id
feedRoutes.put(
  "/edit-post/:_id",
  postsMulter.single("image"),
  postEditPostController
);

//* DELETE /feed/delete-post/:_id
feedRoutes.delete("/delete-post/:_id", deletePostController);

module.exports = feedRoutes;
