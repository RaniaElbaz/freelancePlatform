const express = require("express");
const authMW = require("../middleWares/auth.MW");

const { changePassword } = require("../controllers/changePassword.controller");
const { freelancerAuth } = require("../middlewares/authAccess.MW");

const changePasswordRoute = express.Router();

changePasswordRoute.post(
  "/change-password",
  authMW,
  freelancerAuth,
  changePassword
);

module.exports = changePasswordRoute;
