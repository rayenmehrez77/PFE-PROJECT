const express = require("express");
const router = express.Router();

// Controller

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = require("../utils/configUpload");

// auth routes
router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/:userId").get(userController.getUser);

router.route("/edit-profile/:userId").put(upload.single("image"),userController.updateUser);

router.route("/:userId").delete(userController.deleteUser);

router.route("/").get(userController.getUsers);

module.exports = router;
