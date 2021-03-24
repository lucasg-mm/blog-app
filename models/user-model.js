const mongoose = require("mongoose");
const Post = require("./post-model").schema;

// declares the user schema
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, alias: "username" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: { type: Post },
  },
  {
    id: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// export the schema as a model
module.exports = new mongoose.model("User", userSchema);
