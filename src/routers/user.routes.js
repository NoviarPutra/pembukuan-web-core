const express = require("express");
const {
  signUp,
  getAllUsers,
  removeUser,
  signIn,
  updateUser,
} = require("../controllers/user.controllers");
const {
  validateSignUp,
  validateSignIn,
  validateUpdateUser,
} = require("../middlewares");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", [validateSignUp], signUp);
router.post("/signin", [validateSignIn], signIn);
router.put("/:id", [validateUpdateUser], updateUser);
router.delete("/delete/:id", removeUser);

module.exports = router;
