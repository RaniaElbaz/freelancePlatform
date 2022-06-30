const mongoose = require("mongoose");

require("./../models/team");
let Team = mongoose.model("teams");

module.exports.createTeam=(request,response,next)=>{
    let object = new Team({
        _id:new mongoose.Types.ObjectId(),
        name:request.body.name,
        description:request.body.description,
        hourlyRate:request.body.hourlyRate,
        logo:request.body.logo,
        members:request.body.members,
        /*next fields will be removed*/
        // testimonial:request.body.testimonial,
        // analytic:request.body.analytic,
        // wallet:request.body.wallet,
        // isVerified:request.body.isVerified
    });
    object.save()
            .then(data=>{
            response.status(201).json({msg:"created", data})
            })
            .catch(error=>next(error))
}


// module.exports.getAllTeams=(request,response,next)=>{
//     Team.find({})
//         .then(data=>{
//             response.status(200).json(data)
//         })
//         .catch(error=>{
//             next(error)
//         })
// }

// module.exports.getTeamById=(request,response,next)=>{
//     Team.findOne({_id:request.params.id})  
//     .then(data=>{
//         if(data == null) 
//             next(new Error("Team not found"));
//         else{
//             response.status(200).json(data);
//         }
//     })
//     .catch(error=>{next(error)})
// }




// module.exports.updateTeam=(request,response,next)=>{
//     Team.findById(request.body.id)
//         .then(data=>{
//             if(!data)next(new Error("Team not found"))
//             for (let prop in request.body){
//                 if(prop == "building" || prop == "street" || prop == "city"){
//                     data.address[prop] = request.body[prop] || data.address[prop]
//                 }
//                 else if(prop == "address")
//                     data[prop] = request.body[prop] || data[prop]
//                 else
//                     data[prop] = request.body[prop] || data[prop]
//             }
//             response.status(200).json({msg:"updated",data})
//             data.save()
//         })
//         .catch(error=>{
//             next(error)
//         });
// }

// module.exports.deleteTeam=(request,response,next)=>{
//     Team.deleteOne({_id:request.params.id})
//         .then(data=>{
//             if(data.deletedCount == 0){
//                 next(new Error("Team not found"));
//             }
//             else
//                 response.status(200).json({msg:"deleted"})
//         })
//         .catch(error=>next(error)) 
// }
