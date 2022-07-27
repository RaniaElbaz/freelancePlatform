<<<<<<< HEAD
const { body, param } = require("express-validator");

module.exports.bodyValidator = [
  body("id").isNumeric().withMessage("id should be number"),
];

module.exports.paramValidator = [
  param("id").isNumeric().withMessage("id should be number"),
];
=======
const{body , param}=require("express-validator")


module.exports.bodyValidator=[
    body("id").isNumeric().withMessage("id should be number")
    ]
    
module.exports.paramValidator=[
    param("id").isNumeric().withMessage("id should be number")
    ]

    
>>>>>>> e9762852921fbadd5ca7a3fdcda84454884c19db
