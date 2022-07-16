const express = require("express");
const { param } = require("express-validator");

const freelancerController = require("../controllers/freelancer.controller");
const {signup} = require("../controllers/auth.controller");
const authMW = require("../middleWares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const {
  allAuth,
  AdminAndFreelancerAuth,
  adminAuth,
  clientAndCompanyAuth,
} = require("../middlewares/authAccess.MW");
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
  .route("/freelancers/")
  .get(
    authMW,
    allAuth,
    freelancerController.getAllFreelancers);

/**Register route
 */
freelancerRoute
  .route("/freelancers/register")
  .post(signupValidator, validationMW, hashPassword, signup);

/** to be moved in another controller
 * update private access info
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

/************ might move to projects routes */
freelancerRoute
  .route("/freelancers/:id/update/testimonials")
  .put(
    authMW,
    clientAndCompanyAuth,
    testimonialValidator,
    validationMW,
    freelancerController.updateFreelancerTestimonials
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
  .get(allAuth, freelancerController.getFreelancerById)
  //delete freelancer by id (dev purpose only)
  .delete(adminAuth, freelancerController.deleteFreelancer);

module.exports = freelancerRoute;
