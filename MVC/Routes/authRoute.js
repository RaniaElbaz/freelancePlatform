const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword
} = require("../Controllers/authController");

const { signUpValidation } = require("../Models/clientValidationArray");
const { AdminAndClientAuth } = require("../Middlewares/usersAuthMW");
const validationMW = require("../Middlewares/validationMW");
const authMW = require("../Middlewares/authMW");


const router = express.Router();

//! Handling Generic for All users
//authMW, AdminAndClientAuth,
router.post("/client/signup", signUpValidation, validationMW, signUp);
router.post("/client/activate-account", activateAccount);

router.post("/client/forgot-password", forgotPassword)
router.post("/client/reset-password", resetPassword)

router.post("/login/:userType", userLogin);

// router.put("/reset/:userType", userReset);




module.exports = router;