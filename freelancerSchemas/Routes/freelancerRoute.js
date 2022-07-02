const express = require("express");
const { body, param } = require("express-validator");

const freelancerController = require("../Controllers/freelancerController");

const validationMW = require("../Middlewares/validationMW");
const freelancerValidation = require("../Middlewares/freelancerValidation");
const freelancerRoute = express.Router();

freelancerRoute.route("/freelancers")
    .get(freelancerController.getAllFreelancers)
    .post(freelancerValidation,
        [body("education.organization").optional({ checkFalsy: true, nullable: true })
        .isAlpha().withMessage("freelancer's education is invalid")],
    validationMW,
    freelancerController.addFreelancer)
    .put(freelancerController.updateFreelancer);

freelancerRoute.route("/freelancers/:id")
    .put([
        param("id").isNumeric().withMessage("Freelancer id wrong")
    ],
    validationMW,
    freelancerController.addSkills)
    .get([
        param("id").isNumeric().withMessage("Freelancer id wrong")
    ],
    validationMW,
    freelancerController.getAllFreelancers)
    .delete([
        param("id").isNumeric().withMessage("Freelancer id wrong")
    ],
    validationMW,
    freelancerController.deleteFreelancer);

module.exports = freelancerRoute;