const { check } = require("express-validator");

module.exports.loginValidator = [
  /**********login**********/
  //email
  check("email")
    .notEmpty()
    .withMessage("user's email reqiured")
    .isEmail()
    .withMessage("user's email invalid"),
  //password
  check("password")
    .notEmpty()
    .withMessage("user's password reqiured")
    .isLength({ min: 8, max: 15 })
    .withMessage("user's password should be 8~15"),
];

module.exports.oldPasswordValidator = [
  check("oldPassword")
    .notEmpty()
    .withMessage("users's password reqiured")
];
