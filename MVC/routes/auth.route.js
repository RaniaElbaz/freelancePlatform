const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { adminLogin } = require("../controllers/adminLogin.controller");

const { loginVA } = require("../middlewares/login.MW");
const validationMW = require("../middlewares/validation.MW");
const { signUpVA } = require("../middlewares/client.MW");

const router = express.Router();

router.post("/signup/:userType", signUpVA, validationMW, signUp);
router.post("/activate-account/:userType", activateAccount);

router.post("/forgot-password/:userType", forgotPassword);
router.post("/reset-password/:userType", resetPassword);

// router.post("/login/:userType", userLogin);

router //user
  .route("/login/:userType")
  .post(loginVA, validationMW, userLogin);

router //admin
  .route("/admin/login")
  .post(loginVA, validationMW, adminLogin);

// router.put("/reset/:userType", userReset);

module.exports = router;
