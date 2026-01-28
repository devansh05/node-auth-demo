const express = require("express");
const router = express.Router();
const authenticateUserController = require("../controller");


router.get("/", authenticateUserController.getAllUsers);
router.post("/signup", authenticateUserController.signUpUser);
router.get("/login", authenticateUserController.loginUser);
router.delete("/deleteuser", authenticateUserController.deleteUser);

module.exports = router;
