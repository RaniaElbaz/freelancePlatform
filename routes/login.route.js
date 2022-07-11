const express = require("express");

const { login } = require("../controllers/login.controller");

const validationMW = require("../middlewares/validation.MW");
const { loginValidator } = require("../middlewares/freelancers.MW");

const loginRoute = express.Router();

/**Login route
 */
loginRoute
    .route("/freelancer")
    .post(loginValidator, validationMW, login);

module.exports = loginRoute;
