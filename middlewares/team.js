// import mongoose from 'mongoose';
// import"../models/team"
// let Team = mongoose.model("teams")
const { body ,param, query,check} = require("express-validator");

module.exports.post= [
    check('name').notEmpty().withMessage('team name is required')
        .isString().withMessage('team name should be string')
        .isLength({min:3,max:15}).withMessage('team name length should be between 3,15'),
        // .custom(value=>{
        //     return Team.findOne({name:value})
        //         .then(()=>{
        //             if (value.length) 
        //                 return Promise.reject('team name already taken')
        //         })
        // })

    check('description').notEmpty().withMessage('team description is required')
        .isString().withMessage('team description should be string')
        .isLength({min:100,max:1000}).withMessage('team description length should be between 100,1000'),

    check('hourlyRate').notEmpty().withMessage('team hourlyRate is required')
        .isInt({ min: 10, max: 100 }).withMessage('team hourlyRate should be an interger between 10 and 100'),

    check('logo').isString().optional().withMessage("team logo should be string"),
    //🔴 check('members').notEmpty().withMessage('team members is required')
    //     .isMongoId().withMessage("team members should be array of objectIds")
        // .isLength({min:2,max:10}).withMessage('team members should be between 2,10')
        //check minlength
]



