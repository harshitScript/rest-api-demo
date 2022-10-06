const getPostsController = (req, res, next) => {
  return res.json({ message: 'posts will be served.' })
}

module.exports = { getPostsController }
