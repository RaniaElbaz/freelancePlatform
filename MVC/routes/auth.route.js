const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword
} = require("../Controllers/auth.controller");

const { signUpValidation } = require("../models/clientValidationArray");
const { AdminAndClientAuth } = require("../Middlewares/usersAuth.MW");
const validationMW = require("../Middlewares/validation.MW");
const authMW = require("../Middlewares/auth.MW");


const router = express.Router();

//authMW, AdminAndClientAuth,
router.post("/signup/:userType", signUpValidation, validationMW, signUp);
router.post("/activate-account/:userType", activateAccount);

router.post("/forgot-password;/:userType", forgotPassword)
router.post("/reset-password/:userType", resetPassword)

router.post("/login/:userType", userLogin);

// router.put("/reset/:userType", userReset);



module.exports = router;