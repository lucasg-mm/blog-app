const postService = require("../services/post-service");

// --- GET ---

/**
 * DESCRIPTION: Fetches every post in the db.
 * SENDS: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an array of objects with every post in
 *            the DB;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiGetAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();

    if (!posts.length) {
      res.status(404).json({ message: "There are no posts published yet." });
    } else {
      res.json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

/**
 * DESCRIPTION: Fetches a post with a specific id in the db.
 * REQUEST'S PARAMS:
 *         - postId: id from the post to be searched for.
 * SENDS: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an object, which is the found post;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiGetPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const foundPost = await postService.getPostById(postId);

    if (!foundPost) {
      res.status(404).json({ message: "Post not found." });
    } else {
      res.json(foundPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- POST ---

/**
 * DESCRIPTION: Creates one new post.
 * REQUEST'S BODY: composed of 'title' and 'content'.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *        The JSON can generate:
 *         - In case of success: an object, which is the created post;
 *         - In case of failure: an object with a message attribute.
 */
exports.apiCreatePost = async (req, res, next) => {
  try {
    // data from the post to be created
    const data = {
      title: req.body.title,
      body: req.body.content,
    };

    const createdPost = await postService.createPost(data);
    res.json(createdPost);
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- PATCH ---
/**
 * DESCRIPTION: Updates a post with a given id.
 * REQUEST'S BODY: composed of 'title' and 'content'.
 * REQUEST'S PARAMS: postId - id from the post to be updated.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *           The JSON can generate an object with a message attribute.
 */
exports.apiUpdatePostById = async (req, res, next) => {
  try {
    // data from the post to be created
    const data = {
      title: req.body.title,
      body: req.body.content,
    };
    const postId = req.params.postId;

    const updateResponse = await postService.updatePost(postId, data);
    if (updateResponse) {
      res.json({ message: "Success!" });
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

// --- DELETE ---

/**
 * DESCRIPTION: deletes a post with a given id.
 * REQUEST'S PARAMS: postId - id from the post to be updated.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *           The JSON can generate an object with a message attribute.
 */
exports.apiDeletePostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const deleteResponse = await postService.deletePostById(postId);
    if (deleteResponse) {
      res.json({ message: "Success!" });
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

/**
 * DESCRIPTION: deletes every post in the db.
 * RESPONSE: HTTP response with the appropriate response code and a JSON.
 *           The JSON can generate an object with a message attribute.
 */
exports.apiDeleteAllPosts = async (req, res, next) => {
  try {
    const deleteResponse = await postService.deleteAllPosts();

    if (deleteResponse) {
      res.json({ message: "Success!" });
    } else {
      res.status(404).json({ message: "Posts couldn't be deleted!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};
