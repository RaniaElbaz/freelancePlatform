const express = require("express");
const { param } = require("express-validator");

const freelancerController = require("../controllers/freelancer.controller");

const validationMW = require("../middlewares/validation.MW");
const { hashPassword } = require("../middlewares/hashPassword.MW");
const {
  signupValidator,
  putValidator,
  testimonialValidator,
  putInfoValidator,
} = require("../middlewares/freelancers.MW");

const freelancerRoute = express.Router();

/** freelancers base route
 * for querying and dev purpose
 */
freelancerRoute
  .route("/")
  .get(
    freelancerController.getAllFreelancers
  );

/**Register route
 */
freelancerRoute
  .route("/register")
  .post(
    signupValidator,
    validationMW,
    hashPassword,
    freelancerController.signup
  );

/** to be moved in another controller
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
