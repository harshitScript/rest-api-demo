const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  }
  return cb(null, false);
};

const postsMulter = multer({ storage: diskStorage, fileFilter });

module.exports = postsMulter;
