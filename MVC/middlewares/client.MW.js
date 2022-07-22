const { body, param, query } = require("express-validator");

const updateValidation = [
  body("id").optional().isNumeric().withMessage("Child Id must be a Number"),

  body("firstName")
    .isAlpha()
    .withMessage("Clint's firstName should be a Characters")
    .isLength({ min: 3, max: 10 })
    .withMessage("Clint's firstName length should be > 3 and < 10"),

  body("lastName")
    .isAlpha()
    .withMessage("Clint's lastName should be a Characters")
    .isLength({ min: 3, max: 10 })
    .withMessage("Clint's lastName length should be > 3 and < 10"),

  body("email").isEmail().withMessage("You Should Enter a valid Email"),

  body("picture")
    .optional()
    .isString()
    .withMessage("You should be select a valid Image formate"), // ! Multer Handling

  /** Location
   */
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

  // ! Handling
  body("phoneNumber").isNumeric().withMessage("phoneNumber must be a Number"),

  /** Analytics
   */
  body("analytics.earnings")
    .isNumeric()
    .withMessage("earnings must be a string"),

  body("analytics.jobs").isNumeric().withMessage("jobs must be a string"),

  body("analytics.hours").isNumeric().withMessage("hours must be a string"),

  body("analytics.views").isNumeric().withMessage("views must be a string"),

  body("wallet").isNumeric().withMessage("wallet must be a Number"),

  body("description")
    .isString()
    // .isLength({ min: 100, max: 500 })
    .withMessage("description must be a String"),

  body("isVerified")
    .isBoolean()
    .withMessage("isVerified must be a True or False"),
];

const signUpValidation = [
  body("firstName")
    .isAlpha()
    .withMessage("Clint's firstName should be a Characters")
    .isLength({ min: 3, max: 10 })
    .withMessage("Clint's firstName length should be > 3 and < 10"),

  body("lastName")
    .isAlpha()
    .withMessage("Clint's lastName should be a Characters")
    .isLength({ min: 3, max: 10 })
    .withMessage("Clint's lastName length should be > 3 and < 10"),

  body("email").isEmail().withMessage("You Should Enter a valid Email"),

  body("password")
    // .matches()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password length must between 8 to 15"),
];

const updatePasswordValidation = [
  body("password")
    // .matches()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password length must between 8 to 15"),
];

const blockClientVA = [
  body("isBlocked")
    .isBoolean()
    .withMessage("isBlocked must be a True or False"),
];

module.exports = {
  updateValidation,
  signUpValidation,
  updatePasswordValidation,
  blockClientVA,
};
