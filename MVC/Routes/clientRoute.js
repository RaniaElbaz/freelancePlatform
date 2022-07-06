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
  .get([
    param("id").isNumeric().withMessage("Id isn't correct")
  ], controller.getClientById)
  .put(clintValidationArray, controller.updateClient)
  .delete([
    param("id").isNumeric().withMessage("Id isn't correct")
  ], controller.deleteClient);

module.exports = router;