const express = require('express')
const { addUserController } = require('../controllers/user.controllers')
const create_user_schema = require('../Validations/create-user-schema')
const inputValidatorMiddleware = require('../middleware/inputValidatorMiddleware')
const userMulter = require('../multer/multer.config.users')
const uploadFileCheckMiddleware = require('../middleware/uploadFileCheckMiddleware')

const userRoutes = express.Router()

//* POST /user/add-user
userRoutes.post(
  '/add-user',
  userMulter.single('image'),
  uploadFileCheckMiddleware,
  create_user_schema,
  inputValidatorMiddleware,
  addUserController
)

module.exports = userRoutes
