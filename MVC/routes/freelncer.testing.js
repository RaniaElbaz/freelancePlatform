const express = require("express");
const freelancerController = require("../controllers/freelancer.testing");
const freelancerTestRoute = express.Router();

freelancerTestRoute
  .route("/freelancer/signup")
  .post(freelancerController.freelancerSignup);

module.exports = freelancerTestRoute;
