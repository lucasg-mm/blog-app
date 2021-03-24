// tests CRUD operations with the user service

require("dotenv").config();
const mongoose = require("mongoose");
const userService = require("../services/user-service");
const toContainDocument = require("./custom-matchers/to-contain-document");

describe("CRUD on the user service", () => {
  // ------------- variables used in the tests -------------
  // test user used in every single test in this describe block
  const testUser = {
    username: "testuser12345jik",
    email: "testuser12345jik@gmail.com",
    password: "kjsdh32132#1kdfhksd!",
  };

  // each test creates a new user to realize an operation
  // this variable holds this new user
  let createdUser = {};

  // ------------- one-time setup (also tests create and delete)-------------
  beforeAll(async () => {
    // sets MongoDB up
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // creates a new user
    createdUser = await userService.createUser(testUser);

    // tests if the create was successful
    expect(createdUser).toEqual(expect.objectContaining(testUser));
  });

  afterAll(async () => {
    // deletes the new user
    await userService.deleteUserByUsername(createdUser.username);

    // tests if the delete was successful
    const retrievedUser = await userService.getUserByUsername(createdUser.username);

    // checks if the result of the retrieve is null (it must be)
    expect(retrievedUser).toEqual(null);

    // closes MongoDB connection
    await mongoose.disconnect();
  });
  // ---------------------------------------------

  // ------------- other tests -------------

  test("Reads a single user", async () => {
    // reads the created post by username
    const readUser = await userService.getUserByUsername(createdUser.username);

    // compares read user to the test user
    expect(readUser._id).toEqual(createdUser._id);
  });

  test("Reads every user", async () => {
    // extends functionality with the toContainDocuement
    // custom matcher
    expect.extend({
        toContainDocument,
      });

    // reads every user
    const allUsers = await userService.getAllUsers();

    // checks if the created user is between the users returned
    expect(allUsers).toContainDocument(createdUser);
  });

  test("Updates a user", async () => {
    // updates the email of the test user  
    const updateResponse = await userService.updateUserByUsername(createdUser.username, {
        email: "updatedtestuser12345jik@gmail.com",
      });
    
    // returns true if it was successful
    expect(updateResponse).toEqual(true);
    
    // retrieves post again (after update)
    const retrievedUser = await userService.getUserByUsername(createdUser.username);

    // compares retrieved email to the updated one (to check if ot's really updated)
    expect(retrievedUser.email).toEqual("updatedtestuser12345jik@gmail.com");
  });

  // ----------------------------------
});
