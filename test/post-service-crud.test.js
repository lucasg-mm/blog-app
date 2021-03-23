// tests CRUD operations with the post service

require("dotenv").config();
const mongoose = require("mongoose");
const postService = require("../services/post-service");
const toContainDocument = require("./custom-matchers/to-contain-document");

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

    // compares crested post to the test post
    expect(createdPost).toEqual(expect.objectContaining(testPost));
  });

  afterEach(async () => {
    // deletes the new post
    await postService.deletePostById(createdPost._id);

    // checks if the post is there
    const retrievedPost = await postService.getPostById(createdPost._id);

    // checks if the result of the retrieve is null (it must be)
    expect(retrievedPost).toEqual(null);
  });
  // --------------------------------------------------------

  // ------------- tests -------------

  test("Reads a single post", async () => {
    // reads the created post by id
    const readPost = await postService.getPostById(createdPost._id);

    // compares read post to the created one
    expect(readPost._id).toEqual(createdPost._id);
  });

  test("Reads every post", async () => {
    // extends functionality with the toContainDocuement
    // custom matcher
    expect.extend({
      toContainDocument,
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

  // ----------------------------------
});
