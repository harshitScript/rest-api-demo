const express = require("express");
const {
  addUserController,
  loginUserController,
} = require("../controllers/user.controllers");
const create_user_schema = require("../Validations/create-user-schema");
const inputValidatorMiddleware = require("../middleware/inputValidatorMiddleware");
const userMulter = require("../multer/multer.config.users");
const uploadFileCheckMiddleware = require("../middleware/uploadFileCheckMiddleware");
const { json } = require("body-parser");
const login_user_schema = require("../Validations/login-user-schema");

const userRoutes = express.Router();

//* POST /user/add-user
userRoutes.post(
  "/add-user",
  userMulter.single("image"),
  uploadFileCheckMiddleware,
  create_user_schema,
  inputValidatorMiddleware,
  addUserController
);

//* POST /user/login-user
userRoutes.post(
  "/login-user",
  json(),
  login_user_schema,
  inputValidatorMiddleware,
  loginUserController
);

module.exports = userRoutes;
