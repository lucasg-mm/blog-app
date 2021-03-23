const User = require("../models/user-model");

// --- GET ---

/**
 * DESCRIPTION: Fetches every user in the db.
 * RETURNS: array of objects (empty if there are no users).
 * THROWS: error in case of database error.
 */
exports.getAllUsers = async () => {
  try {
    const allUsers = await User.find().exec();
    return allUsers;
  } catch (error) {
    console.log("DATABASE ERROR! Could not fetch all posts.");
    throw error;
  }
};

/**
 * DESCRIPTION: fetches user by username.
 * PARAMS: username - username of the user to be looked for.
 * RETURNS: - the found user
 *          - if the post wasn't found: null
 * THROWS: error in case of database error.
 */
exports.getUserByUsername = async (username) => {
  try {
    const foundUser = await User.findOne({ username: username }).exec();
    return foundUser;
  } catch {
    console.log("DATABASE ERROR! Could not fetch this specific user.");
    throw error;
  }
};

// --- POST ---

/**
 * DESCRIPTION: creates one new user.
 * PARAMS: userData - object with 'username', 'email' and 'password' properties.
 * RETURNS: the newly created user.
 * THROWS: error in case of database error.
 */
exports.createUser = async (userData) => {
  try {
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });

    // saves the new user
    const createdUser = await newUser.save();

    // returns it
    return createdUser;
  } catch (error) {
    console.log("DATABASE ERROR! Could not create user.");
    console.log(error);

    throw error;
  }
};

// --- PATCH ---

/**
 * DESCRIPTION: updates a user with a given username.
 * PARAMS: username - username from the user to be updated.
 *         user - object with the user data to be updated.
 * RETURNS: true if the user was found, and false otherwise.
 * THROWS: error in case of database error.
 */
exports.updateUserByUsername = async (username, userData) => {
  try {
    const updateResponse = await User.updateOne(
      { username: username },
      { $set: userData }
    ).exec();
    
    // returns true if it was updated
    return updateResponse.n === 1;
  } catch (error) {
    console.log("DATABASE ERROR! Could not update user.");
    console.log(error);

    throw error;
  }
};

// --- DELETE ---

/**
 * DESCRIPTION: deletes a post with a given username
 * PARAMS: username - username from the user to be deleted.
 * RETURNS: true if the user was deleted, and false otherwise.
 * THROWS: error in case of database error.
 */
exports.deleteUserByUsername = async (username) => {
  try {
    const deleteResponse = await User.deleteOne({ username: username }).exec();

    // returns true if it was deleted
    return deleteResponse.ok === 1;
  } catch (error) {
    console.log("DATABASE ERROR! Could not delete user.");
    console.log(error);

    throw error;
  }
};
