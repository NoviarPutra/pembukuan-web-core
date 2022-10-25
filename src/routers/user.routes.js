const express = require("express");
const {
  signUp,
  getAllUsers,
  removeUser,
  signIn,
  updateUser,
} = require("../controllers/user.controllers");
const {
  validateBeforeSignUp,
  validateBeforeSignIn,
  validateBeforeUpdateUser,
} = require("../middlewares");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", [validateBeforeSignUp], signUp);
router.post("/signin", [validateBeforeSignIn], signIn);
router.put("/:id", [validateBeforeUpdateUser], updateUser);
router.delete("/delete/:id", removeUser);

module.exports = router;
