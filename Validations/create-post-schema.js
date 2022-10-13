const { body, validationResult } = require('express-validator')

const create_post_schema = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 25 })
    .withMessage('Title must 10 to 25 characters long.'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must have 10 characters')
]

const validatorMiddleware = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) {
    return next()
  }

  return res.status(412).json({ errors: validationErrors.errors })
}

module.exports = { schema: create_post_schema, validatorMiddleware }
