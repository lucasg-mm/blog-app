const mongoose = require("mongoose");
const defaultOptions = require("./schema-default-options")();

// declares the post schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Number, required: true },
    authorUsername: { type: String, ref: "User", required: true },
  },
  defaultOptions
);

// export the schema as a model
module.exports = new mongoose.model("Post", postSchema);
