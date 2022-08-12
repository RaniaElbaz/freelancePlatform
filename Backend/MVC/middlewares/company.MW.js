const { body, param } = require("express-validator");

module.exports.bodyValidator = [
  body("id").isNumeric().withMessage("id should be number"),
];

module.exports.paramValidator = [
  param("id").isNumeric().withMessage("id should be number"),
];

module.exports.signUpValidator = [
  body("name").isAlpha().withMessage("name should be string"),
  body("email").isEmail().withMessage("company email invalid"),
  body("password")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}")
    .withMessage("company password invalid"),
];

module.exports.detailsValidator = [
  body("logo").isAlpha().withMessage("logo should be string"),
  body("website")
    .matches(
      "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)"
    )
    .withMessage("website not valid"),
  body("secondEmail").isEmail().withMessage("company email invalid"),
  body("phoneNumber")
    .matches("^01[0125][0-9]{8}$")
    .withMessage("phonenumber invaild"),
  body("location.postalCode")
    .optional()
    .isNumeric()
    .isLength({ min: 5, max: 5 })
    .withMessage("You entered invalid postalCode"),
  body("location.city")
    .optional()
    .isString()
    .withMessage("City name must be String"),
  body("location.address")
    .optional()
    .isString()
    .withMessage("Address must be String"),
  body("location.state")
    .optional()
    .isString()
    .withMessage("Address must be String"),
  body("description")
    .isString()
    .isLength({ min: 100, max: 500 })
    .withMessage("description must be a String"),
];