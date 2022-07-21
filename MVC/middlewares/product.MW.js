const{body , param}=require("express-validator")


module.exports.bodyValidator=[
    body("id").isNumeric().withMessage("id should be number")
    ]
    
module.exports.paramValidator=[
    param("id").isNumeric().withMessage("id should be number")
    ]

    