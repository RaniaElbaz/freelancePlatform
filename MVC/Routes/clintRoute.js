const express = require("express");
const { body, param, query } = require("express-validator");


const controller = require("./../Controllers/clientController");
const validationMW = require("./../Middlewares/validationMW");
const clintValidationArray = require("./../Models/clintValidationArray");


const router = express.Router();


router.route("/clint")
  .get(controller.getAllClint)
  .post(clintValidationArray, controller.createClint)
  .put(clintValidationArray, controller.updateClint)


router.route("/clint/:id")
  .get([
    param("id").isNumeric().withMessage("Id isn't correct")
  ], controller.getClintById)
  .delete([
    param("id").isNumeric().withMessage("Id isn't correct")
  ], controller.deleteClint);

module.exports = router;