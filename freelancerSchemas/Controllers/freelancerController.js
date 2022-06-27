const mongoose = require("mongoose");

require("../Models/freelancers");

let Freelancer = mongoose.model("freelancers");
/**
 get all freelancer data
 */
module.exports.getAllFreelancers = (request,response,next) => {
    Freelancer.find({})
        .then(data=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
/**
 add new freelancer
 */
module.exports.addFreelancer = (request,response,next) => {
    let freelancerObject = new Freelancer({
        _id: request.body.id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password,
        email: request.body.email,
        secondEmail: request.body.secondEmail,
        phoneNumber: request.body.phone,
        profileImage: request.body.profileImage,
        isVerified: request.body.isVerified,
        hourlyRate: request.body.hourlyRate,
        wallet: request.body.wallet,
        hoursPerWeek: request.body.hoursPerWeek,
        description: request.body.description,
        languages: request.body.languages,
        education: request.body.education,
        testimonials: request.body.testimonials,
        certificates: request.body.certificates,
        portfolio: request.body.portfolio,
        experience: request.body.experience,
        projects: request.body.projects,
        location: request.body.location,
        analytics: request.body.analytics,
        // paymentMethods: request.body.paymentMethods,
        skills: request.body.skills
    });
    freelancerObject.save()
        .then(data=>{
            response.status(201).json({data:"added"});
        })
        .catch(error=>next(error))      
}
/**
 update a freelancer data
 */
module.exports.updateFreelancer = (request,response,next) => {
    Freelancer.findById(request.body.id)
        .then(data => {
            if(data) return data.save()
        })
        .then(data=>{
            response.status(201).json({data:"updated"});
        })
        .catch(error=>next(error))    
}
/**
 delete a freelancer
 */
module.exports.deleteFreelancer = (request,response,next) => {
    Freelancer.deleteOne({_id:request.params.id})
    .then(data=>{
        response.status(200).json({data:"delete " + request.params.id})
    })
    .catch(error=>next(error)); 
}