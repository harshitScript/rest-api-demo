const jwt = require('jsonwebtoken')

const authChecker = (req, res, next) => {
  const { authorization } = req.headers

  const authToken = authorization.split(' ')[1]

  try {
    const decodedToken = jwt.verify(authToken, process.env.PASSWORD_SECRET)

    if (!decodedToken) {
      throw new Error('Cant Decode Token.')
    }

    req.userId = decodedToken?.userId

    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = authChecker
