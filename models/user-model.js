const mongoose = require("mongoose");
const defaultOptions = require("./schema-default-options")();

// declares the user schema
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, alias: "username" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  defaultOptions
);

// export the schema as a model
module.exports = new mongoose.model("User", userSchema);
