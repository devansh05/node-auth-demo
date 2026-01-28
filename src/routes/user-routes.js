const express = require("express");
const router = express.Router();
const authenticateUserController = require("../controller");
const { ensureAuthenticated, restrictToRole } = require("../middlewares");

const adminRestricedRoutes = restrictToRole("admin");
router.get(
  "/",
  ensureAuthenticated,
  adminRestricedRoutes,
  authenticateUserController.getAllUsers,
);
router.post("/signup", authenticateUserController.signUpUser);
router.get("/login", authenticateUserController.loginUser);
router.delete(
  "/deleteuser",
  ensureAuthenticated,
  adminRestricedRoutes,
  authenticateUserController.deleteUser,
);

module.exports = router;
