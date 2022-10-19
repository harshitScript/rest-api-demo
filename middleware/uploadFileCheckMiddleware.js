const uploadFileCheckMiddleware = (req, res, next) => {
  if (req?.file) {
    return next()
  }
  return res.status(412).json({
    message: 'Invalid image format.'
  })
}
module.exports = uploadFileCheckMiddleware
