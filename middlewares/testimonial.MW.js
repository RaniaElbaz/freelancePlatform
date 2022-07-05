const { check } = require("express-validator");

module.exports.post = [
  check("rating")
    .notEmpty()
    .withMessage("testimonial rating is required")
    .isNumeric()
    .withMessage("testimonial rating should be number")
    .isLength({ min: 1, max: 5 })
    .withMessage("testimonial rating length should be between 1,5"),

  check("issued")
    .notEmpty()
    .withMessage("testimonial issued is required")
    .isDate()
    .withMessage("testimonial issued should be date"),

  check("comment")
    .notEmpty()
    .withMessage("testimonial comment is required")
    .isString({ min: 50, max: 1000 })
    .withMessage("testimonial comment should be a string between 50 and 1000"),

  check("project")
    .notEmpty()
    .withMessage("testimonial project is required")
    .isNumeric()
    .withMessage("testimonial project should be number"),
];

// module.exports.put = [
//   check("rating")
//     .isNumeric()
//     .optional()
//     .withMessage("testimonial rating should be number")
//     .isLength({ min: 1, max: 5 })
//     .withMessage("testimonial rating length should be between 1,5"),

//   check("issued")
//     .isDate()
//     .optional()
//     .withMessage("testimonial issued should be date"),

//   check("comment")
//     .isString({ min: 50, max: 1000 })
//     .optional()
//     .withMessage("testimonial comment should be a string between 50 and 1000"),

//   check("project")
//     .isNumeric()
//     .optional()
//     .withMessage("testimonial project should be number"),
// ];

// module.exports.getDelete = [
//   check("pId").isNumeric().withMessage("testimonial project shoud be number"),
// ];
