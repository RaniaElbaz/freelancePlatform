const mongoose = require("mongoose");

require("../models/reports");

let Report = mongoose.model("reports");
/**
 get all Report data
 */
module.exports.getAllReports = (request,response,next) => {
    Report.find({})
        .then(data=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
/**
 add new Report
 */
module.exports.addReport = (request,response,next) => {
    let ReportObject = new Report({
        _id: request.body.id,
        date: request.body.date,
        title: request.body.title,
        body: request.body.body,
        category: request.body.category,
        reporter: request.body.reporter,
        reported: request.body.reported,
    });
    ReportObject.save()
        .then(data=>{
            response.status(201).json({data:"added"});
        })
        .catch(error=>next(error))      
}
/**
 update a Report data
 */
module.exports.updateReport = (request,response,next) => {
    Report.findById(request.body.id)
        .then(data => {
            if(data) return data.save()
        })
        .then(data=>{
            response.status(201).json({data:"updated"});
        })
        .catch(error=>next(error))    
}
/**
 delete a Report
 */
module.exports.deleteReport = (request,response,next) => {
    Report.deleteOne({_id:request.params.id})
    .then(data=>{
        response.status(200).json({data:"delete " + request.params.id})
    })
    .catch(error=>next(error)); 
}