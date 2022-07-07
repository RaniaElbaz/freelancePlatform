const { check, param } = require("express-validator");
const { languages } = require("../data/enums");

module.exports.postValidator = [
  // numeric auto incremented id
  check("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's id must be a number"),

  /**********signup**********/
  //name
  check("firstName")
    .notEmpty()
    .withMessage("freelancer's first name reqiured")
    .isAlpha()
    .withMessage("freelancer's firstname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("freelancer firstname lenghth should be > 3"),
  check("lastName")
    .notEmpty()
    .withMessage("freelancer's last name reqiured")
    .isAlpha()
    .withMessage("freelancer's lastname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("freelancer lastname lenghth should be > 3"),
  //email
  check("email")
    .notEmpty()
    .withMessage("freelancer's email reqiured")
    .isEmail()
    .withMessage("freelancer's email invalid"),
  //password
  check("password")
    .notEmpty()
    .withMessage("freelancer's password reqiured")
    .isLength({ min: 6, max: 15 })
    .withMessage("freelancer's password should be 6~15"),
];

module.exports.putValidator = [
  // numeric auto incremented id
  param("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's id must be a number"),

  //name
  check("firstName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's firstname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("freelancer firstname lenghth should be > 3"),

  check("lastName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's lastname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("freelancer lastname lenghth should be > 3"),

  /**********update profile**********/
  //phone
  check("phoneNumber")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 11 })
    .withMessage("freelancer's phoneNumber is invalid"),

  //address
  check("postalCode")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's postalCode is invalid")
    .isLength({ min: 5, max: 5 })
    .withMessage("freelancer's postalCode is invalid"),
  check("city")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's city must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("freelancer's city is invalid"),
  check("state")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's state must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("freelancer's state is invalid"),
  check("address")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("freelancer's address is invalid")
    .isLength({ min: 5, max: 20 })
    .withMessage("freelancer's address is invalid"),

  //title
  check("title")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 5, max: 15 })
    .withMessage("freelancer's title must be 5~15"),

  //description
  check("description")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 100, max: 500 })
    .withMessage("freelancer's description is invalid"),

  //image
  check("profileImage")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 5 })
    .withMessage("freelancer's image is invalid"),

  //languages
  check("languages")
    .optional({ checkFalsy: true, nullable: true })
    .isIn(languages)
    .withMessage("freelancer's languages is invalid"),

  //certificates
  //organozation
  check("certificateOrganization")
    .optional({ checkFal0sy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's certificateOrganization is required")
    .isLength({ min: 2, max: 25 })
    .withMessage("freelancer's certificate organization must be 2~25"),
  //title
  check("certificateTitle")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's certificateOrganization is required")
    .isLength({ min: 5, max: 25 })
    .withMessage("freelancer's certificate title must be 2~25"),
  //YYYY-MM-DD
  check("certificateIssued")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's certificateOrganization is required")
    .isDate()
    .withMessage(
      "freelancer's certificate issued date date must be in 'YYYY-MM-DD' format"
    ),
  //description
  check("description")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 100, max: 500 })
    .withMessage("freelancer's description is invalid"),
  //url
  check("certificateUrl")
    .optional({ checkFalsy: true, nullable: true })
    .isURL()
    .withMessage("freelancer's certificate url is invalid"),
  //id
  check("certificateId")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("freelancer's certificateId is invalid"),
  //expiration date
  check("certificateExpirationDate")
    .optional({ checkFalsy: true, nullable: true })
    .isDate()
    .withMessage("freelancer's expiration date must be in 'YYYY-MM-DD' format"),
];

module.exports.post = [
  check("testimonialRating")
    .notEmpty()
    .withMessage("testimonial rating is required")
    .isNumeric()
    .withMessage("testimonial rating should be number")
    .isLength({ min: 1, max: 5 })
    .withMessage("testimonial rating length should be between 1,5"),

  check("testimonialIssued")
    .notEmpty()
    .withMessage("testimonial issued is required")
    .isDate()
    .withMessage("testimonial issued should be date"),

  check("testimonialComment")
    .notEmpty()
    .withMessage("testimonial comment is required")
    .isString({ min: 50, max: 1000 })
    .withMessage("testimonial comment should be a string between 50 and 1000"),

  check("testimonialProject")
    .notEmpty()
    .withMessage("testimonial project is required")
    .isNumeric()
    .withMessage("testimonial project should be number"),
];

module.exports.put = [
  /**********2 step verification**********/
  //second email
  // check("secondEmail").optional({ checkFalsy: true, nullable: true })
  // .isEmail().withMessage("freelancer's second email invalid"),

  check("isVerified")
    .optional({ checkFalsy: true, nullable: true })
    .isBoolean()
    .withMessage("freelancer's verified state is invalid"),

  check("hourlyRate")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's hourly rate is invalid"),

  check("wallet")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's wallet is invalid"),

  check("hoursPerWeek")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's hoursPerWeek is invalid"),

  check("projects")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's projects is invalid"),

  check("skills")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's skills is invalid"),

  // check("testimonials").optional({ checkFalsy: true, nullable: true })
  // .isNumeric().withMessage("freelancer's skills is invalid"),

  // check("certificates").optional({ checkFalsy: true, nullable: true })
  // .isNumeric().withMessage("freelancer's skills is invalid"),

  // check("portfolio").optional({ checkFalsy: true, nullable: true })
  // .isNumeric().withMessage("freelancer's skills is invalid"),

  // check("experience").optional({ checkFalsy: true, nullable: true })
  // .isNumeric().withMessage("freelancer's skills is invalid"),

  // check("analytics").optional({ checkFalsy: true, nullable: true })
  // .isNumeric().withMessage("freelancer's skills is invalid"),
];
