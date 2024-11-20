const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const { auth } = require("../middlewares/auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/sendOTP", sendOTP);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
