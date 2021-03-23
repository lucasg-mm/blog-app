const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/", userController.apiGetAllUsers);
router.post("/", userController.apiCreateUser);
router.get("/:username", userController.apiGetUserByUsername);
router.patch("/:username", userController.apiUpdateUserByUsername);
router.delete("/:username", userController.apiDeleteUserByUsername);

module.exports = router;