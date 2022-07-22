const { check } = require("express-validator");

module.exports.post = [
  check("title")
    .notEmpty()
    .withMessage("project title is required")
    .isString()
    .withMessage("project title should be string"),

  check("description")
    .notEmpty()
    .withMessage("project description is required")
    .isString()
    .withMessage("project description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("project description length should be between 100,1000"),

  check("isInternship")
    .isBoolean()
    .optional()
    .withMessage("isInternship should be boolean"),

  check("budget.type")
    .notEmpty()
    .withMessage("project budget is required")
    .isString()
    .withMessage("project budget should be an string")
    .isIn(["fixed", "hourlyRate"]).withMessage(`doctor department should be in (
    "fixed",
    "hourlyRate")`),

  check("budget.value")
    .notEmpty()
    .withMessage("project budget is required")
    .isInt({ min: 10, max: 100 })
    .withMessage("project budget should be an interger between 10 and 100"),

  check("skills")
    .notEmpty()
    .withMessage("project skills is required")
    .isArray({ min: 3, max: 20 })
    .withMessage("project skills should be array 3:20"),

  check("duration")
    .notEmpty()
    .withMessage("project duration is required")
    .isString()
    .withMessage("project duration should be string"),

  check("connects")
    .notEmpty()
    .withMessage("project members is required")
    .isInt({ min: 3, max: 20 })
    .withMessage("project members should be array 3:20"),
];

module.exports.put = [
  check("id").isNumeric().withMessage("project id shoud be number"),

  check("title")
    .isString()
    .optional()
    .withMessage("project title should be string"),

  check("description")
    .isString()
    .optional()
    .withMessage("project description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("project description length should be between 100,1000"),

  check("isInternship")
    .isBoolean()
    .optional()
    .withMessage("isInternship should be boolean"),

  check("budget.type")
    .isString()
    .optional()
    .withMessage("project budget should be an string")
    .isIn(["fixed", "hourlyRate"]).withMessage(`doctor department should be in (
    "fixed",
    "hourlyRate")`),

  check("budget.value")
    .isInt({ min: 10, max: 100 })
    .optional()
    .withMessage("project budget should be an interger between 10 and 100"),

  check("skills")
    .isArray()
    .optional()
    .withMessage("project skills should be array 3:20"),

  check("duration")
    .isString()
    .optional()
    .withMessage("project duration should be string"),

  check("connects")
    .isInt()
    .optional()
    .withMessage("project members should be array 3:20"),
];

module.exports.getDelete = [
  check("id").isNumeric().withMessage("project id shoud be number"),
];

module.exports.createProposal = [
  check("id").isNumeric().withMessage("project id shoud be number"),

  check("text")
    .notEmpty()
    .withMessage("proposal text is required")
    .isString()
    .withMessage("proposal text should be string"),
  check("files")
    .optional()
    .isArray()
    .withMessage("proposal files should be array"),
];
