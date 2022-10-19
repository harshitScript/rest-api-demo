const User = require('../models/users')
const { createHmac } = require('crypto')
const { generateHashedPassword } = require('../utils/helper')

const addUserController = (req, res, next) => {
  const { name, username, email, password } = req.body

  const { file } = req

  const hashedPassword = generateHashedPassword({ password })

  const successCallback = () => {
    return res.status(201).json({
      message: 'User Creation Successful.'
    })
  }

  const failureCallback = (error) => {
    next(error)
  }

  const user = new User({
    name,
    username,
    email,
    image: `${process.env.HOST}${file.path}`,
    password: hashedPassword
  })

  user.save().then(successCallback).catch(failureCallback)
}

module.exports = {
  addUserController
}
