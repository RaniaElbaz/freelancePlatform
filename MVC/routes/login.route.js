const express = require("express");

const { adminLogin } = require("../controllers/adminLogin.controller");

const validationMW = require("../middlewares/validation.MW");
const { loginValidator } = require("../middlewares/login.MW");

const loginRoute = express.Router();

/**Login routes
 */
loginRoute //admin
  .route("/admin/login")
  .post(loginValidator, validationMW, adminLogin);


module.exports = loginRoute;
