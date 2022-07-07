const express = require("express");
const { body, param } = require("express-validator");

const freelancerController = require("../Controllers/freelancer.controller");
const freelancerloginController = require("../Controllers/freelancerLogin.controller");

const validationMW = require("../Middlewares/validation.MW");
const {
  postValidator,
  putValidator,
} = require("../Middlewares/freelancers.MW");

const freelancerRoute = express.Router();

/** freelancers base route
 * for querying and dev purpose
 */
freelancerRoute.route("/").get(freelancerController.getAllFreelancers);

/**Login route
 */
freelancerRoute.route("/login").post(freelancerloginController.login);

/**Register route
 */
freelancerRoute
  .route("/register")
  .post(postValidator, validationMW, freelancerController.signup);

/************ might move to projects routes */
freelancerRoute
  .route("/:id/testimonials")
  .put(
    putValidator,
    validationMW,
    freelancerController.updateFreelancerTestimonials
);
  
freelancerRoute.route("/:id/remove/:detail").put(
  // put,
  // validationMW,
  freelancerController.removeData
);

/** byId routes
 */
freelancerRoute
  .route("/:id/:updateData")
  .put(putValidator, validationMW, freelancerController.updateFreelancerInfo);

/** byId routes
 */
freelancerRoute.route("/:id/:detail").put(
  // put,
  // validationMW,
  freelancerController.updateFreelancerProfile
);

freelancerRoute
  .route("/:id")
  //get freelancer by id (show profile)
  .get(
    [param("id").isNumeric().withMessage("Freelancer id wrong")],
    validationMW,
    freelancerController.getFreelancerById
  )
  //delete freelancer by id (dev purpose only)
  .delete(
    [param("id").isNumeric().withMessage("Freelancer id wrong")],
    validationMW,
    freelancerController.deleteFreelancer
  );

module.exports = freelancerRoute;
