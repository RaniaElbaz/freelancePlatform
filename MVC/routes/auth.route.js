const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword
} = require("../Controllers/auth.controller");

const { signUpValidation } = require("../Models/clientValidationArray");
const { AdminAndClientAuth } = require("../Middlewares/usersAuth.MW");
const validationMW = require("../Middlewares/validation.MW");
const authMW = require("../Middlewares/auth.MW");


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