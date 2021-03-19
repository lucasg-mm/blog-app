// tests CRUD operations with the post service

require("dotenv").config();
const mongoose = require("mongoose");
const postService = require("../services/post-service");
const _ = require("lodash");

describe("CRUD on the post service", () => {
  // ------------- variables used in the tests -------------
  // test post used in every single test in this describe block
  const testPost = {
    title: "post title",
    content: "post content",
  };

  // each test creates a new post to realize an operation
  // this variable holds this new post
  let createdPost = {};
  // -------------------------------------------------------

  // ------------- one-time setup -------------
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  // ---------------------------------------------

  // ------------- repeated setup for each test -------------
  beforeEach(async () => {
    // creates a new post
    createdPost = await postService.createPost(testPost);
  });

  afterEach(async () => {
    // deletes the new post
    await postService.deletePostById(createdPost._id);
  });
  // --------------------------------------------------------

  // ------------- tests -------------
  test("Creates a new post", async () => {
    // compares crested post to the test post
    expect(createdPost).toEqual(expect.objectContaining(testPost));
  });

  test("Reads a single post", async () => {
    // reads the created post by id
    const readPost = await postService.getPostById(createdPost._id);

    // compares read post to the created one
    expect(readPost._id).toEqual(createdPost._id);
  });

  // checks if a object with an _id property is inside
  // a array of objects with _id properties (it checks
  // for equality)
  test("Reads every post", async () => {
    expect.extend({
      toContainDocument(received, expectedToBeIn) {
        let pass = false;

        for (let i = 0; i < received.length; i++) {
          if (_.isEqual(received[i]._id, expectedToBeIn._id)) {
            pass = true;
            break;
          }
        }

        if (pass) {
          return {
            pass: true,
          };
        } else {
          return {
            pass: false,
          };
        }
      },
    });

    // reads every post
    const allPosts = await postService.getAllPosts();

    // checks if the created post is between the posts returned
    expect(allPosts).toContainDocument(createdPost);
  });

  test("Update a post", async () => {
    const updateResponse = await postService.updatePostById(createdPost._id, {
      title: "updated",
    });

    expect(updateResponse).toEqual(true); // returns true if it was successful

    const retrievedPost = await postService.getPostById(createdPost._id); // retrieve the updated post

    expect(retrievedPost.title).toEqual("updated"); // checks if title was really updated
  });

  test("Delete a post", async () => {
    // creates a new post
    newPost = await postService.createPost(testPost);

    // deletes the new post
    postService.deletePostById(newPost._id);

    // checks if the post is there
    const retrievedPost = await postService.getPostById(newPost._id);

    // checks if the result of the retrieve is null (it must be)
    expect(retrievedPost).toEqual(null);
  });

  // ----------------------------------
});
