const Post = require("../models/post-model");

// --- GET ---

/**
 * DESCRIPTION: Fetches every post in the db.
 * RETURNS: array of objects (empty if there are no posts).
 * THROWS: error in case of database error.
 */
exports.getAllPosts = async () => {
  try {
    const allPosts = await Post.find().exec();
    return allPosts;
  } catch (error) {
    console.log("DATABASE ERROR! Could not fetch posts!");
    console.log(error);

    throw error;
  }
};

/**
 * DESCRIPTION: fetches post by id.
 * PARAMS: postId - id of the post to be looked for.
 * RETURNS: - the found post
 *          - if the post wasn't found: null
 * THROWS: error in case of database error.
 */
exports.getPostById = async (postId) => {
  try {
    const foundPost = await Post.findById(postId).exec();
    return foundPost;
  } catch (error) {
    console.log("DATABASE ERROR! Could not fetch post!");
    console.log(error);

    throw error;
  }
};

// --- POST ---

/**
 * DESCRIPTION: creates one new post.
 * PARAMS: data - object with 'title' and 'content' properties.
 * RETURNS: the newly created post.
 * THROWS: error in case of database error.
 */
exports.createPost = async (data) => {
  try {
    // creates new post with the data
    const newPost = new Post({
      title: data.title,
      content: data.content,
      time: (new Date()).getTime(),
      authorUsername: data.authorUsername,
    });

    // saves the new post
    const createdPost = await newPost.save();

    // returns the newly created document
    return createdPost;
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not create post");
    console.log(error);

    throw error;
  }
};

// --- PATCH ---

/**
 * DESCRIPTION: Updates a post with a given id.
 * PARAMS: postId - id from the post to be updated.
 *         post - object with 'title' and 'content' properties.
 * RETURNS: true if the post was found, and false otherwise.
 * THROWS: error in case of database error.
 */
exports.updatePostById = async (postId, post) => {
  try {
    post.time = (new Date()).getTime();
    const updateResponse = await Post.updateOne(
      { _id: postId },
      { $set: post }
    ).exec();

    // returns true if one doc was found
    return updateResponse.n === 1;
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not update post!");
    console.log(error);

    throw error;
  }
};

// --- DELETE METHODS ---

/**
 * DESCRIPTION: deletes a post with a given id
 * PARAMS: postId - id from the post to be deleted.
 * RETURNS: true if the post was deleted, and false otherwise.
 * THROWS: error in case of database error.
 */
exports.deletePostById = async (postId) => {
  try {
    const deleteResponse = await Post.deleteOne({ _id: postId }).exec();
    return deleteResponse.deletedCount === 1;
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not delete post!");
    console.log(error);

    throw error;
  }
};

/**
 * DESCRIPTION: deletes a post with a given id
 * PARAMS: postId - id from the post to be deleted.
 * RETURNS: true if the posts were deleted, and false otherwise.
 * THROWS: error in case of database error.
 */
exports.deleteAllPosts = async () => {
  try {
    const deleteResponse = await Post.deleteMany({}).exec();
    return deleteResponse.ok === 1;
  } catch (error) {
    // in case of error...
    console.log("DATABASE ERROR! Could not delete posts!");
    console.log(error);

    throw error;
  }
};
