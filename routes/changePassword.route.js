const express = require("express");
const authMW = require("../middleWares/auth.MW");

const { changePassword } = require("../controllers/changePassword.controller");
const { freelancerAccess } = require("../middlewares/freelancerAccess.MW");
const { hashPassword } = require("../middlewares/hashPassword.MW");

const changePasswordRoute = express.Router();

changePasswordRoute.post(
  "/change-password",
  authMW,
  freelancerAccess,
  changePassword
);

module.exports = changePasswordRoute;
