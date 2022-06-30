const { body ,param, query,check} = require("express-validator");

module.exports.post= [
    check('name').notEmpty().withMessage('skill name is required')
        .isString().withMessage('skill name should be string')
        .isLength({min:3,max:20}).withMessage('skill name length should be between 3,15'),
        // .custom(value=>{
        //     return Skill.findOne({name:value})
        //         .then(()=>{
        //             if (value.length) 
        //                 return Promise.reject('skill name already taken')
        //         })
        // })

    //🔴 check('categories').isNumeric().optional().withMessage("skill categories should be array of objectIds")
    //check for unique items
]



