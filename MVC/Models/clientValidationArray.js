const { body, param, query } = require("express-validator");

module.exports = [ // Validations
  // body("id").isNumeric().withMessage("Child Id must be a Number").optional, // ! Handling
  body("firstName").isAlpha().withMessage("Clint's firstName should be a Characters"),
  body("lastName").isAlpha().withMessage("Clint's lastName should be a Characters"),
  body("email").isEmail().withMessage("You Should Enter a valid Email"),
  body("picture").notEmpty().withMessage("Clint should be select a valid Image formate"), // ! Multer Handling
  body("location.street").isString().withMessage("Street must be a string"),
  body("location.buildingNumber").isString().withMessage("BuildingNumber must be a string"),
  body("location.city").isString().withMessage("City must be a string"),
  body("location.country").isString().withMessage("Country must be a string"),
  // body("location.postalCode").isString().withMessage("postalCode must be a string"), // ! Handling
  body("phoneNumber").isNumeric().withMessage("phoneNumber must be a Number"),
  body("analytics.followers").isNumeric().withMessage("followers must be a string"),
  body("analytics.following").isNumeric().withMessage("following must be a string"),
  body("analytics.viewers").isNumeric().withMessage("viewers must be a string"),
  body("wallet").isNumeric().withMessage("wallet must be a Number"),
  body("description").isAlpha().withMessage("wallet must be a String"),
  body("isVerified").isBoolean().withMessage("wallet must be a True or False")
];
