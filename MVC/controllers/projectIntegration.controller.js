const mongoose = require("mongoose");

require("../models/team.model");
let Team = mongoose.model("teams");

require("../models/freelancers.model");
let Freelancer = mongoose.model("freelancers");

let Client = require("../models/client.model");

require("../models/company.model");
let Company = mongoose.model("company");

/* when project is posted */
// module.exports.addProjectToRecruiter = (request, response, next) => {
//   let Recruiter;
//   if (request.role == "company") Recruiter = Company;
//   else if (request.role == "client") Recruiter = Client;
//   else next(new Error("invalid recruiter type"));

//   Recruiter.findById(request.id)
//     .populate("projects")
//     .then((data) => {
//       if (!data) throw new Error("recruiter not found");
//       data.projects.push(request.project); //🔅
//       return data.save().then((data) => {
//         response
//           .status(200)
//           .json({ msg: "project added to recruiter", data: data.projects });
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };
/*when talent creates a proposal for project */
// module.exports.decreaseConnectionsFromTalent = (request, response, next) => {
//   let Talent;
//   if (request.role == "freelancer") Talent = Freelancer;
//   else if (request.role == "team") Talent = Team;
//   else next(new Error("invalid talent type"));

//   Talent.findById(request.id)
//     .then((data) => {
//       if (!data) throw new Error("talent not found");
//       data.connects -= request.connects; //🔅
//       return data.save().then((data) => {
//         response
//           .status(200)
//           .json({ msg: "project added to talent", data: data.projects });
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

/* when project is ongoing */
module.exports.addProjectToTalent = (request, response, next) => {
  let Talent;
  if (request.body.talent.type == "freelancers") Talent = Freelancer;
  else if (request.body.talent.type == "teams") Talent = Team;
  else next(new Error("invalid talent type"));

  Talent.findById(request.body.talent.id)
    .populate("projects")
    .then((data) => {
      if (!data) throw new Error("talent not found");
      data.projects.push(request.params.id);
      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "project added to talent", data: data.projects });
      });
    })
    .catch((error) => {
      next(error);
    });
};

/*when project is fininshed */
// module.exports.createTestimonialToTalent = (request, response, next) => {
//   let Talent;
//   if (request.talent_type == "freelancers") Talent = Freelancer; //🔅
//   else if (request.talent_type == "teams") Talent = Team; //🔅
//   else next(new Error("invalid talent type"));

//   Talent.findOne({ projects: request.params.id })
//     .populate({ path: "projects" })
//     .then((data) => {
//       if (!data) next(new Error("Project not found"));
//       let testimonial = {};
//       testimonial.project = request.params.id;
//       testimonial.issued = new Date();
//       testimonial.rating = request.body.rating;
//       testimonial.comment = request.body.comment;
//       data.testimonials.push(testimonial);
//       let project = data.projects.filter((obj) => obj._id == request.params.id);
//       console.log(project[0]);
//       data.analytics.earnings += project[0].budget;
//       data.analytics.hours += project[0].duration;
//       data.analytics.jobs += 1;
//       //🟢data.wallet +=data.project.budget;
//       return data.save().then((data) => {
//         response.status(200).json({
//           msg: "testimonial created",
//           data: data.testimonials,
//         });
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

module.exports.createTestimonialToRecruiter = (request, response, next) => {
  let Recruiter;
  if (request.body.recruiterType == "client") Recruiter = Client;
  else if (request.body.recruiterType == "company") Recruiter = Company;
  else next(new Error("invalid Recruiter type"));

  Recruiter.findOne({ projects: request.params.id })
    .populate({ path: "projects" })
    .then((data) => {
      if (!data) next(new Error("project not found"));
      let testimonial = {};
      testimonial.project = request.params.id;
      testimonial.issued = new Date();
      testimonial.rating = request.body.rating;
      testimonial.comment = request.body.comment;
      data.testimonials.push(testimonial);
      let project = data.projects.filter((obj) => obj._id == request.params.id);
      console.log(project[0]);
      data.analytics.spent += project[0].budget;
      data.analytics.jobs += 1;
      //🟢data.wallet +=data.project.budget;
      return data.save().then((data) => {
        response.status(200).json({
          msg: "testimonial created",
          data: data.testimonials,
        });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTestimonialByProjectId = (request, response, next) => {
  let User;
  if (request.params.userType == "freelancer") User = Freelancer;
  else if (request.params.userType == "team") User = Team;
  else if (request.params.userType == "client") User = Client;
  else if (request.params.userType == "company") User = Company;
  else next(new Error("invalid User"));

  User.findOne({ "testimonials.project": request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let testimonial of data.testimonials) {
          if (testimonial.project == request.params.id) {
            data.testimonials.splice(data.testimonials.indexOf(testimonial), 1);
            console.log(data.testimonials.indexOf(testimonial));
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};
