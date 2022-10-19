const { validationResult } = require('express-validator')

const inputValidatorMiddleware = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) {
    return next()
  }

  return res.status(412).json({ errors: validationErrors.errors })
}

module.exports = inputValidatorMiddleware
