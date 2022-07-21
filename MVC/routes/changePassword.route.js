const express = require("express");
const {
 
  forgotPassword,
  resetPassword
} = require("../controllers/companyChAndRePWdController");


const validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");


const router = express.Router();



// router.post("/company/forgot-password", forgotPassword)
// router.post("/company/reset-password", resetPassword)







module.exports = router;