const errorHandlingMiddleware = (error, req, res) => {
  return res.status(error.customStatus || 500).json({ message: error.message })
}
module.exports = errorHandlingMiddleware
