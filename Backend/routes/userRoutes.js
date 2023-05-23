const express = require("express");
const router = express.Router();

// Controller

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// auth routes
router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/").post(userController.createUser);

router.route("/:userId").get(userController.getUser);

router.route("/:userId").put(userController.updateUser);

router.route("/:userId").delete(userController.deleteUser);

module.exports = router;
