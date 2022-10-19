const multer = require('multer')

const diskStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`)
  },
  destination: (req, file, cb) => {
    //* Destination must be provided by thinking we are in the root directory
    return cb(null, 'images/user')
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return cb(null, true)
  }
  return cb(null, false)
}

const userMulter = multer({ storage: diskStorage, fileFilter })

module.exports = userMulter
