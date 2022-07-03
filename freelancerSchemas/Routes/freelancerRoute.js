const express = require("express");
const { body, param } = require("express-validator");

const freelancerController = require("../Controllers/freelancerController");
const freelancerloginController = require("../Controllers/freelancerLoginController");

const validationMW = require("../Middlewares/validationMW");
const freelancerValidation = require("../Middlewares/freelancerValidation");

const freelancerRoute = express.Router();

/**Login route
 */
freelancerRoute.route("/login").post(freelancerloginController.login);

/**Register route
 */
freelancerRoute
  .route("/register")
  .post(freelancerValidation, validationMW, freelancerController.signup);

/** freelancers base route
 * for querying and dev purpose
 */
freelancerRoute.route("/").get(freelancerController.getAllFreelancers);

/** by id routes
 */
freelancerRoute
  .route("/:id")
  //profile creation/update routes
//   .put(freelancerController.updateFreelancer)
  .put(
    [param("id").isNumeric().withMessage("Freelancer id wrong")],
    validationMW,
    freelancerController.addSkills
  )
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
