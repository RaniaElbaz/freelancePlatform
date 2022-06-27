const { body } = require("express-validator");

module.exports = [
    body("id").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's id should be characters"),

    body("firstName").isAlpha().withMessage("freelancer's firstname should be characters")
    .isLength({min:3,max:14}).withMessage("freelancer firstname lenghth should be > 3"),

    body("lastName").isAlpha().withMessage("freelancer's lastname should be characters")
    .isLength({min:3,max:14}).withMessage("freelancer lastname lenghth should be > 3"),

    body("email").isEmail().withMessage("freelancer's email invalid"),

    body("password").isLength({min:3,max:10}).withMessage("freelancer's password should be > 4"),

    body("secondEmail").optional({ checkFalsy: true, nullable: true })
    .isEmail().withMessage("freelancer's second email invalid"),
    
    body("phoneNumber").optional({ checkFalsy: true, nullable: true })
    .isLength({min:11}).withMessage("freelancer's phoneNumber is invalid"),

    body("profileImage").optional({ checkFalsy: true, nullable: true })
    .isLength({min:3}).withMessage("freelancer's  is invalid"),

    body("isVerified").optional({ checkFalsy: true, nullable: true })
    .isBoolean().withMessage("freelancer's verified state is invalid"),

    body("hourlyRate").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's hourly rate is invalid"),

    body("wallet").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's wallet is invalid"),

    body("hoursPerWeek").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's hoursPerWeek is invalid"),

    body("description").optional({ checkFalsy: true, nullable: true })
    .isLength({min:100,max:500}).withMessage("freelancer's description is invalid"),

    body("languages").optional({ checkFalsy: true, nullable: true })
    .isIn(["Arabic","English"]).withMessage("freelancer's languages is invalid"),

    body("projects").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's projects is invalid"),

    body("skills").optional({ checkFalsy: true, nullable: true })
    .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("testimonials").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("certificates").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("portfolio").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("experience").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("analytics").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),

    // body("location").optional({ checkFalsy: true, nullable: true })
    // .isNumeric().withMessage("freelancer's skills is invalid"),
];