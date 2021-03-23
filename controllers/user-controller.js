const userService = require("../services/user-service");

// --- GET ---

/**
 * DESCRIPTION: Fetches every user in the db.
 * SENDS: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an array of objects with every user in
 *            the DB;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiGetAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    if (users.length === 0) {
      res.status(404).json({ message: "There are no users yet!" });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

/**
 * DESCRIPTION: Fetches a post with a specific username in the db.
 * REQUEST'S PARAMS:
 *         - username: username from the user to be searched for.
 * SENDS: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an object, which is the found user;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiGetUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;

    const foundUser = await userService.getUserByUsername(username);

    if (!foundUser) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.json(foundUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- POST ---

/**
 * DESCRIPTION: Creates one new user.
 * REQUEST'S BODY: composed of 'username', 'email' and 'password'.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an object, which is the created user;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiCreateUser = async (req, res, next) => {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const createdUser = await userService.createUser(userData);
    res.json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- PATCH ---
/**
 * DESCRIPTION: Updates a user with a given username.
 * REQUEST'S BODY: composed of 'password' and 'email'.
 * REQUEST'S PARAMS: username - id from the user to be updated.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *           The JSON can generate an object with a message attribute.
 */
exports.apiUpdateUserByUsername = async (req, res, next) => {
  try {
    const userData = {
      password: req.body.password,
      email: req.body.email,
    };
    const username = req.params.username;

    const updateResponse = await userService.updateUserByUsername(
      username,
      userData
    );

    if (updateResponse) {
      res.json({ message: "Success!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- DELETE ---

/**
 * DESCRIPTION: deletes a user with a given username.
 * REQUEST'S PARAMS: username - username from the user to be updated.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *           The JSON can generate an object with a message attribute.
 */
exports.apiDeleteUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;

    const deleteResponse = await userService.deleteUserByUsername(username);

    if (deleteResponse) {
      res.json({ message: "Success!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};
