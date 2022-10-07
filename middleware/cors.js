const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGINS)
  res.setHeader('Access-Control-Allow-Methods', process.env.ALLOW_METHODS)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
}

module.exports = cors
