const express = require("express");
const { body, param } = require("express-validator");

const reportController = require("../Controllers/reportController");

const validationMW = require("../Middlewares/validationMW");
// const reportValidation = require("../Middlewares/reportValidation");
const reportRoute = express.Router();

reportRoute.route("/reports")
    .get(reportController.getAllReports)
    .post(
        // reportValidation,
        // [body("education.organization").optional({ checkFalsy: true, nullable: true })
        // .isAlpha().withMessage("report's education is invalid")],
    // validationMW,
    reportController.addReport)
    .put(reportController.updateReport);

reportRoute.route("/reports/:id")
    .delete([
        param("id").isNumeric().withMessage("report id wrong")
    ],
    validationMW,
    reportController.deleteReport);

module.exports = reportRoute;