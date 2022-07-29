const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { adminLogin } = require("../controllers/adminLogin.controller");
const { loginValidator } = require("../middlewares/login.MW");
const validationMW = require("../middlewares/validation.MW");
const { signupValidator } = require("../middlewares/login.MW");

const router = express.Router();

router.post("/signup/:userType", signupValidator, validationMW, signUp);
router.post("/activate-account/:userType/:token", activateAccount);

router.post("/forgot-password/:userType", forgotPassword);
router.post("/reset-password/:userType", resetPassword);

router //user
  .route("/login/:userType")
  .post(loginValidator, validationMW, userLogin);

router //admin
  .route("/admin/login")
  .post(loginValidator, validationMW, adminLogin);

// router.put("/reset/:userType", userReset);

module.exports = router;
