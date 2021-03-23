const mongoose = require("mongoose");
const Post = require("./post-model");

// declares the user schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: {type: Post}
});

// export the schema as a model
module.exports = new mongoose.model("User", userSchema);