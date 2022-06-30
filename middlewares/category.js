// import mongoose from 'mongoose';
// import"../models/category"
// let Category = mongoose.model("categorys")
const { body ,param, query,check} = require("express-validator");

module.exports.post= [
    check('name').notEmpty().withMessage('category name is required')
        .isString().withMessage('category name should be string')
        .isLength({min:3,max:20}).withMessage('category name length should be between 3,15'),
        // .custom(value=>{
        //     return Category.findOne({name:value})
        //         .then(()=>{
        //             if (value.length) 
        //                 return Promise.reject('category name already taken')
        //         })
        // })

    check('image').isString().optional().withMessage("category image should be string"),
    //🔴 check('skills')
    //     .isNumeric().optional().withMessage("category skills should be array of objectIds")
        //check unique items
]



