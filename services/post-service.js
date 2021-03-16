const Post = require("../models/post-model");

// --- GET METHODS ---

// Fetches all the posts in the db
exports.getAllPosts = async () => {
  try {
    const allPosts = await Post.find().exec();
    return allPosts;
  } catch (error) {
    console.log("Could not fetch posts!");
    console.log(error);
    return -1; // return error code
  }
};

// Fetches article by id
exports.getById = async (postId) => {
  try {
    const foundPost = await Post.findById(postId).exec();
  } catch (error) {
    console.log(error);
    return -1;
  }
};

// --- POST METHODS ---

// Creates one new post. expects an object called 'data'
// 'data' should have the properties: title, body
exports.createPost = async (data) => {
  try {
    // creates new post with the data
    const newPost = new Post({
      title: data.title,
      body: data.title,
      date: new Date.now(),
    });

    // saves the new post
    const createdPost = await newPost.save();

    // returns the newly created document
    return createdPost;
  } catch (error) {
    // in case of error...
    console.log("Could not create post");
    console.log(error);

    // return error code
    return -1;
  }
};

// --- PATCH METHODS ---

// Updates a post with a given id
exports.updatePostById = async (postId, post) => {
  try {
    post.date = new Date().now();
    const updateResponse = await Post.updateOne(
      { id: postId },
      { $set: post }
    ).exec();
    return updateResponse;
  } catch (error) {
    // in case of error...
    console.log("Could not update post!");
    console.log(error);

    //return error code
    return -1;
  }
};

// --- DELETE METHODS ---

// Deletes a post with a given id
exports.deletePostById = async (postId) => {
  try {
    const deleteResponse = await Post.deleteOne({ id: postId }).exec();
    return deleteResponse;
  } catch (error) {
    // in case of error...
    console.log("Could not delete post!");
    console.log(error);

    //return error code
    return -1;
  }
};

// Delete every post in the db
exports.deleteAllPosts = async () => {
  try {
    const deleteResponse = await Post.deleteMany({}).exec();
    return deleteResponse;
  } catch (error) {
    // in case of error...
    console.log("Could not delete posts!");
    console.log(error);

    //return error code
    return -1;
  }
};
