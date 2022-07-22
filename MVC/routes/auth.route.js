const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const { signUpValidation } = require("../middlewares/client.MW");
const { AdminAndClientAuth } = require("../middlewares/usersAuth.MW");
const validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");

const router = express.Router();

//authMW, AdminAndClientAuth,
router.post("/signup/:userType", signUpValidation, validationMW, signUp);
router.post("/activate-account/:userType/:token", activateAccount);

router.post("/forgot-password/:userType", forgotPassword);
router.post("/reset-password/:userType", resetPassword);

router.post("/login/:userType", userLogin);

// router.put("/reset/:userType", userReset);

module.exports = router;
