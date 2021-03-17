const mongoose = require("mongoose");

// declares the post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = new mongoose.model("Post", postSchema);
