const express = require('express')
const {
  addUserController,
  loginUserController
} = require('../controllers/user.controllers')
const createUserSchema = require('../Validations/create-user-schema')
const inputValidatorMiddleware = require('../middleware/inputValidatorMiddleware')
const userMulter = require('../multer/multer.config.users')
const uploadFileCheckMiddleware = require('../middleware/uploadFileCheckMiddleware')
const { json } = require('body-parser')
const loginUserSchema = require('../Validations/login-user-schema')

const userRoutes = express.Router()

//* POST /user/add-user
userRoutes.post(
  '/add-user',
  userMulter.single('image'),
  uploadFileCheckMiddleware,
  createUserSchema,
  inputValidatorMiddleware,
  addUserController
)

//* POST /user/login-user
userRoutes.post(
  '/login-user',
  json(),
  loginUserSchema,
  inputValidatorMiddleware,
  loginUserController
)

module.exports = userRoutes
