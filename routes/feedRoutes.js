const express = require("express");
const {
  getPostsController,
  postAddPostsController,
  getPostController,
  postEditPostController,
  deletePostController,
  getPostsPagesCountController,
} = require("../controllers/feed.controllers");
const create_post_schema = require("../Validations/create-post-schema");
const postsMulter = require("../multer/multer.config.posts");
const inputValidatorMiddleware = require("../middleware/inputValidatorMiddleware");
const uploadFileCheckMiddleware = require("../middleware/uploadFileCheckMiddleware");
const authChecker = require("../middleware/authChecker");

const feedRoutes = express.Router();

//*  GET /feed/posts
feedRoutes.get("/posts/:page", authChecker, getPostsController);

//* GET /feed/posts-pages-count
feedRoutes.get("/posts-pages-count", authChecker, getPostsPagesCountController);

//* POST /feed/add-post
feedRoutes.post(
  "/add-post",
  authChecker,
  postsMulter.single("image"),
  uploadFileCheckMiddleware,
  create_post_schema,
  inputValidatorMiddleware,
  postAddPostsController
);

//* GET /feed/post/:_id
feedRoutes.get("/post/:_id", authChecker, getPostController);

//* PUT /feed/edit-post/:_id
feedRoutes.put(
  "/edit-post/:_id",
  authChecker,
  postsMulter.single("image"),
  uploadFileCheckMiddleware,
  create_post_schema,
  inputValidatorMiddleware,
  postEditPostController
);

//* DELETE /feed/delete-post/:_id
feedRoutes.delete("/delete-post/:_id", authChecker, deletePostController);

module.exports = feedRoutes;
