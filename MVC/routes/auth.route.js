const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword
} = require("../Controllers/auth.controller");
const { adminLogin } = require("../controllers/adminLogin.controller");

const { loginValidator } = require("../middlewares/login.MW");
const { AdminAndClientAuth } = require("../Middlewares/usersAuth.MW");
const validationMW = require("../Middlewares/validation.MW");
const authMW = require("../Middlewares/auth.MW");
const { signUpValidation } = require("../middlewares/client.MW");

const router = express.Router();

//authMW, AdminAndClientAuth,
router.post("/signup/:userType", signUpValidation, validationMW, signUp);
router.post("/activate-account/:userType/:token", activateAccount);

router.post("/forgot-password/:userType", forgotPassword);
router.post("/reset-password/:userType", resetPassword);

// router.post("/login/:userType", userLogin);

router //user
  .route("/login/:userType")
  .post(loginValidator, validationMW, userLogin);
  
router //admin
  .route("/admin/login")
  .post(loginValidator, validationMW, adminLogin);

// router.put("/reset/:userType", userReset);

module.exports = router;
