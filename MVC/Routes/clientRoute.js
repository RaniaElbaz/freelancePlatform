const express = require("express");
const { body, param, query } = require("express-validator");


const controller = require("../Controllers/clientController");
const validationMW = require("../Middlewares/validationMW");
const clintValidationArray = require("../Models/clientValidationArray");


const router = express.Router();


router.route("/client")
  .get(controller.getAllClients)
  .post(clintValidationArray, controller.createClient)


router.route("/client/:id")
  .all([
    param("id").isNumeric().withMessage("Id isn't correct")
  ])
  .get(controller.getClientById)
  .put(clintValidationArray, controller.updateClient)
  .delete(controller.deleteClient);


// ! testimonials route
router.route("/client/testimonials")
  .post();



//   freelancerRoute
//   .route("/:id/testimonials")
//   .put(
//     putValidator,
//     validationMW,
//     freelancerController.updateFreelancerTestimonials
// );

module.exports = router;