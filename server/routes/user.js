const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.addUser);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.get("/user/profile", authentication, UserController.getProfile);
router.patch(
  "/user/profile/salary",
  authentication,
  UserController.updateSalary,
);

module.exports = router;
