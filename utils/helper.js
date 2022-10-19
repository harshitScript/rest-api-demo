const fs = require('fs/promises')
const { createHmac } = require('crypto')

const deleteFile = ({ absUrl = '' }) => {
  return fs.unlink(absUrl)
}

const generateHashedPassword = ({ algorithm = 'sha512', password = '' }) => {
  return createHmac(algorithm, process.env.PASSWORD_SECRET)
    .update(password)
    .digest('hex')
}

module.exports = {
  generateHashedPassword,
  deleteFile
}
