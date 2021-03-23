const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/", userController.apiGetAllUsers);
router.post("/", userController.apiCreateUser);
router.get("/:username", userController.apiGetPostByUsername);
router.patch("/:username", userController.apiUpdatePostByUsername);
router.delete("/:username", userController.apiDeletePostByUsername);

module.exports = router;