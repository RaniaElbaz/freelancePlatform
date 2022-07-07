const express = require("express");
const { body, param } = require("express-validator");

const testController = require("../Controllers/test.controller");

const validationMW = require("../Middlewares/validationMW");
const testValidation = require("../Middlewares/testValidation");
const testRoute = express.Router();

testRoute.route("/tests")
    .get(testController.getAllTests)
    .post(
    //     testValidation,
    //     [body("education.organization").optional({ checkFalsy: true, nullable: true })
    //     .isAlpha().withMessage("test's education is invalid")],
    // validationMW,
    testController.addTest)
    .put(testController.updateTest);

testRoute.route("/tests/:id")
    .delete([
        param("id").isNumeric().withMessage("test id wrong")
    ],
    validationMW,
    testController.deleteTest);

module.exports = testRoute;