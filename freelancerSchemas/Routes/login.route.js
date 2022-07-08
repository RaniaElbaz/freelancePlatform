const express = require("express");

const { login } = require("../Controllers/login.controller");

const validationMW = require("../Middlewares/validation.MW");
const { loginValidator } = require("../Middlewares/freelancers.MW");

const loginRoute = express.Router();

/**Login route
 */
loginRoute
    .route("/freelancer")
    .post(loginValidator, validationMW, login);

module.exports = loginRoute;
