const mongoose = require("mongoose");

// declares the post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, required: true },
});

// export the schema as a model
module.exports = new mongoose.model("Post", postSchema);
