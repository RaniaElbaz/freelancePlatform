const { check } = require("express-validator");

module.exports.post = [
  check("name")
    .notEmpty()
    .withMessage("team name is required")
    .isString()
    .withMessage("team name should be string")
    .isLength({ min: 3, max: 15 })
    .withMessage("team name length should be between 3,15"),

  check("description")
    .notEmpty()
    .withMessage("team description is required")
    .isString()
    .withMessage("team description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("team description length should be between 100,1000"),

  check("hourlyRate")
    .notEmpty()
    .withMessage("team hourlyRate is required")
    .isInt({ min: 10, max: 100 })
    .withMessage("team hourlyRate should be an interger between 10 and 100"),

  check("logo").isString().optional().withMessage("team logo should be string"),

  check("members")
    .notEmpty()
    .withMessage("team members is required")
    .isArray({ min: 2, max: 15 })
    .withMessage("team members should be array 2:10"),

  check("skills")
    .notEmpty()
    .withMessage("team skills is required")
    .isArray({ min: 2, max: 15 })
    .withMessage("team skills should be array 2:15"),
];

module.exports.put = [
  check("id")
    .notEmpty()
    .withMessage("team id is required")
    .isNumeric()
    .withMessage("team id shoud be number"),

  check("name")
    .isString()
    .optional()
    .withMessage("team name should be string")
    .isLength({ min: 3, max: 15 })
    .withMessage("team name length should be between 3,15"),

  check("description")
    .isString()
    .optional()
    .withMessage("team description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("team description length should be between 100,1000"),

  check("hourlyRate")
    .isInt({ min: 10, max: 100 })
    .optional()
    .withMessage("team hourlyRate should be an interger between 10 and 100"),

  check("logo").isString().optional().withMessage("team logo should be string"),

  check("members")
    .isArray()
    .optional()
    .withMessage("team members should be array"),

  check("skills")
    .isArray()
    .optional()
    .withMessage("team skills should be array"),
];

module.exports.getDelete = [
  check("id").isNumeric().withMessage("team id shoud be number"),
];

module.exports.removeMember = [
  check("id").isNumeric().withMessage("team id shoud be number"),
  check("members")
    .notEmpty()
    .withMessage("team members is required")
    .isArray()
    .withMessage("team members should be array"),
];
