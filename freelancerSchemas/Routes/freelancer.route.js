const express = require("express");
const { body, param } = require("express-validator");

const freelancerController = require("../Controllers/freelancer.controller");
const freelancerloginController = require("../Controllers/freelancerLogin.controller");

const validationMW = require("../Middlewares/validation.MW");
const {
  postValidator,
  putValidator,
  testimonialValidator,
  putInfoValidator,
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

/** to be moved in anoter controller
 */
freelancerRoute
  .route("/:id/info")
  .put(
    putInfoValidator,
    validationMW,
    freelancerController.updateFreelancerInfo
  );

/************ might move to projects routes */
freelancerRoute
  .route("/:id/update/testimonials")
  .put(
    testimonialValidator,
    validationMW,
    freelancerController.updateFreelancerTestimonials
  );

/** update profile details
 * :detail options:
 * 1- details for [phone, address, title, image, ...]
 * 2- {to be updated value}> certificates, experience, etc.
 */
freelancerRoute
  .route("/:id/update/:detail")
  .put(
    putValidator,
    validationMW,
    freelancerController.updateFreelancerDetails
);

freelancerRoute
  .route("/:id/edit/:detail")
  .put(putValidator, validationMW, freelancerController.editData);

freelancerRoute
  .route("/:id/remove/:detail")
  .put(putValidator, validationMW, freelancerController.removeData);

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
