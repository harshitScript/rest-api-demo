const notFoundController = (req, res) => {
  const { path } = req

  return res.status(404).json({
    message: `The requested path ${path} is not found on our server.`
  })
}

module.exports = notFoundController
