const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  /* userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  }, */
});

module.exports = mongoose.model("posts", postSchema);
