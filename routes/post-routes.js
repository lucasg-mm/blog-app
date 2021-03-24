const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");

router.get("/", postController.apiGetAllPosts);
router.post("/", postController.apiCreatePost);
router.get("/:postId", postController.apiGetPostById);
router.patch("/:postId", postController.apiUpdatePostById);
router.delete("/:postId", postController.apiDeletePostById);

module.exports = router;
