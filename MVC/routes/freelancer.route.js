const express = require("express");
const { param, body } = require("express-validator");

const freelancerController = require("../controllers/freelancer.controller");
const authMW = require("../middleWares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const {
  allAuth,
  freelancerAuth,
  adminAuth,
  AdminAndFreelancerAuth,
  AdminAndClientAndCompanyAuth,
} = require("../middlewares/authAccess.MW");
const {
  putValidator,
  testimonialValidator,
  putInfoValidator,
} = require("../middlewares/freelancers.MW");
const { signupValidator } = require("../middlewares/login.MW");

const freelancerRoute = express.Router();

/** freelancers base route
 * for querying and dev purpose
 */
freelancerRoute
  .route("/freelancers/")
  .get(authMW, allAuth, freelancerController.getAllFreelancers);

freelancerRoute.route("/freelancers/public/:id").get(
  authMW,
  allAuth,
  [param("id").isNumeric().withMessage("Freelancer id wrong")],
  validationMW,
  //get freelancer by id (show profile)
  freelancerController.getFreelancerPublic
);

/** update private access info
 * (isBlocked, isVerified, analytics, badges, connects, wallet)
 */
freelancerRoute
  .route("/freelancers/:id/info")
  .put(
    authMW,
    adminAuth,
    putInfoValidator,
    validationMW,
    freelancerController.updateFreelancerInfo
  );

/************ dev purpose only */
freelancerRoute
  .route("/freelancers/:id/update/testimonials")
  .put(
    authMW,
    AdminAndClientAndCompanyAuth,
    testimonialValidator,
    validationMW,
    freelancerController.updateFreelancerTestimonials
  );

/** update profile image */
freelancerRoute
  .route("/freelancers/:id/update/image")
  .put(
    authMW,
    freelancerAuth,
    freelancerController.imageUpload,
    freelancerController.updateFreelancerImage
  );

/** update profile details
 * :detail options:
 * 1- details for [phone, address, title, image, ...]
 * 2- {to be updated value}> certificates, experience, etc.
 * 3- skills
 */
freelancerRoute
  .route("/freelancers/:id/update/:detail")
  .put(
    authMW,
    AdminAndFreelancerAuth,
    putValidator,
    validationMW,
    freelancerController.filesUpload,
    freelancerController.updateFreelancerDetails
  );

freelancerRoute
  .route("/freelancers/:id/edit/:detail")
  .put(
    authMW,
    AdminAndFreelancerAuth,
    putValidator,
    validationMW,
    freelancerController.editData
  );

freelancerRoute
  .route("/freelancers/:id/remove/:detail")
  .put(
    authMW,
    AdminAndFreelancerAuth,
    putValidator,
    validationMW,
    freelancerController.removeData
  );

freelancerRoute
  .route("/freelancers/:id")
  .all(
    authMW,
    [param("id").isNumeric().withMessage("Freelancer id wrong")],
    validationMW
  )
  //get freelancer by id (show profile)
  .get(AdminAndFreelancerAuth, freelancerController.getFreelancerPrivate)
  //delete freelancer by id (dev purpose only)
  .delete(adminAuth, freelancerController.deleteFreelancer);

freelancerRoute
  .route("/update/connects/:userType")
  .put(authMW, adminAndFreelancerAndTeamAuth, freelancerController.updateConnects);

/** for testing */
freelancerRoute
  .route("/freelancer/signup")
  .post(signupValidator, validationMW, freelancerController.freelancerSignup);

module.exports = freelancerRoute;