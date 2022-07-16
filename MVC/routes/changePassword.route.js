const express = require("express");
const authMW = require("../middleWares/auth.MW");

const { changePassword } = require("../controllers/changePassword.controller");
const { allAuth } = require("../middlewares/authAccess.MW");
const { loginValidator, oldPasswordValidator} = require("../middlewares/login.MW");
const validationMW = require("../middlewares/validation.MW");

const changePasswordRoute = express.Router();

changePasswordRoute.post(
  "/changePassword",
  authMW,
  allAuth,
  loginValidator,
  oldPasswordValidator,
  validationMW,
  changePassword
);

module.exports = changePasswordRoute;
