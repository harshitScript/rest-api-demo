const fs = require("fs/promises");

const deleteFile = ({ absUrl = "" }) => {
  return fs.unlink(absUrl);
};

module.exports = deleteFile;
