const mongoose = require("mongoose");

require("../models/Tests");

let Test = mongoose.model("tests");
/**
 get all Test data
 */
module.exports.getAllTests = (request,response,next) => {
    Test.find({})
        .then(data=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
/**
 add new Test
 */
module.exports.addTest = (request,response,next) => {
    let TestObject = new Test({
        _id: request.body.id,
        duration: request.body.duration,
        skills: request.body.skills,
        body: request.body.body,
        badges: request.body.badges
    });
    TestObject.save()
        .then(data=>{
            response.status(201).json({data:"added"});
        })
        .catch(error=>next(error))      
}
/**
 update a Test data
 */
module.exports.updateTest = (request,response,next) => {
    Test.findById(request.body.id)
        .then(data => {
            if(data) return data.save()
        })
        .then(data=>{
            response.status(201).json({data:"updated"});
        })
        .catch(error=>next(error))    
}
/**
 delete a Test
 */
module.exports.deleteTest = (request,response,next) => {
    Test.deleteOne({_id:request.params.id})
    .then(data=>{
        response.status(200).json({data:"delete " + request.params.id})
    })
    .catch(error=>next(error)); 
}