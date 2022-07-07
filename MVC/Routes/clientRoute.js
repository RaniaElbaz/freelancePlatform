const express = require("express");
const { body, param, query } = require("express-validator");


const controller = require("../Controllers/clientController");
const validationMW = require("../Middlewares/validationMW");
const clintValidationArray = require("../Models/clientValidationArray");


const router = express.Router();


router.route("/client")
  .get(controller.getAllClients)
  .post(clintValidationArray.signUp, controller.signUp)


router.route("/client/:id")
  .all([
    param("id").isNumeric().withMessage("Id isn't correct")
  ])
  .get(controller.getClientById)
  .put(clintValidationArray.update, controller.updateClient)
  .delete(controller.deleteClient);


router.route("/client/:id/testimonials")
  .post(controller.updateTestimonials);


module.exports = router;