const express = require("express");
const authMW = require("../MiddleWares/auth.MW");

const { changePassword } = require("../Controllers/changePassword.controller");
const { freelancerAccess } = require("../Middlewares/freelancerAccess.MW");

const changePasswordRoute = express.Router();

changePasswordRoute.post(
  "/changepassword",
  authMW,
  freelancerAccess,
  changePassword
);

module.exports = changePasswordRoute;
