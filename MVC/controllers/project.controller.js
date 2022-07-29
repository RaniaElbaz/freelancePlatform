const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");

require("../models/project.model");
let Project = mongoose.model("projects");

require("../models/client.model");
let Client = mongoose.model("clients");

require("../models/company.model");
let Company = mongoose.model("company");

require("../models/team.model");
let Team = mongoose.model("teams");

// const Freelancer = require("./../models/freelancers.model");

module.exports.createProject = (request, response, next) => {
  if (request.body.isInternship) {
    delete request.body.budget;
  }
  let object = new Project({
    title: request.body.title,
    description: request.body.description,
    isInternship: request.body.isInternship,
    budget: request.body.budget,
    recruiter: {
      id: request.id,
      type: request.role == "company" ? "company" : request.role + "s",
    },
    category: request.body.category,
    skills: request.body.skills,
    duration: request.body.duration,
    connects: request.body.connects,
  });
  object
    .save()
    .then((data) => {
      let Recruiter;
      if (request.role == "company") Recruiter = Company;
      else if (request.role == "client") Recruiter = Client;
      else next(new Error("invalid recruiter type"));

      Recruiter.findById(request.id).then((recruiter) => {
        if (!recruiter) throw new Error("recruiter not found");
        recruiter.projects.push(data._id);
        return recruiter.save().then((recruiter) => {
          response.status(200).json({
            msg: "project added to recruiter",
            recruiter: recruiter.projects,
          });
        });
      });
    })
    .catch((error) => next(error));
};

module.exports.getAllProjects = (request, response, next) => {
  Project.find({ status: "posted" })

    .populate({ path: "skills", select: "name" })
    .populate({ path: "category", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProjectById = (request, response, next) => {
  Project.findById(request.params.id, { proposals: 0 })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "category", select: "name" })
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProjectByIdPrivate = (request, response, next) => {
  let talentType = "";
  Project.findById(request.params.id, { talent: 1 })
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else if (request.role == "admin") {
      } else if (
        !(
          data.recruiter.id == request.id && data.recruiter.type == request.role
        )
      ) {
        next(new Error("not your project"));
      } else talentType = data.talent.type;

      Project.findById(request.params.id)
        .populate({ path: "skills", select: "name" })
        .populate({ path: "category", select: "name" })
        .populate({
          path: "talent",
          populate: {
            path: "id",
            model: talentType,
          },
        })
        .then((data) => {
          response.status(200).json(data);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteProject = (request, response, next) => {
  Project.findOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error("project not found"));
      } else if (request.role == "admin") {
      } else if (
        !(data.recruiter.id == request.id &&
        (data.recruiter.type == request.role) == "company"
          ? "company"
          : request.role + "s")
      ) {
        next(new Error("you're not the owner of this project"));
      } else {
        if (data.status == "ongoing")
          throw Error("can't delete ongoing project");
        else {
          data.delete();
          response.status(200).json({ msg: "project deleted" });
        }
      }
    })
    .catch((error) => next(error));
};

module.exports.updateProject = (request, response, next) => {
  Project.findById(request.params.id)
    .then((data) => {
      console.log(request.id, request.role);
      console.log(data.recruiter);
      if (!data) next(new Error("project not found"));
      else if (request.role == "admin") {
      } else if (
        !(
          data.recruiter.type ==
            (request.role == "company" ? request.role : request.role + "s") &&
          data.recruiter.id == request.id
        )
      ) {
        next(new Error("you're not the owner of this project"));
      } else if (data.status != "posted") {
        throw Error(`can't update project ${data.status}`);
      }
      for (let prop in request.body) {
        if (
          prop == "recruiter" ||
          prop == "startTime" ||
          prop == "status" ||
          prop == "talent" ||
          prop == "proposals" ||
          prop == "isInternship"
        ) {
          continue;
        } else data[prop] = request.body[prop] || data[prop];
      }
      return data.save().then((data) => {
        response.status(201).json({ msg: "Project updated", data });
      });
    })
    .catch((error) => {
      next(error);
    });
};

const filesStorage = multer.diskStorage({
  destination: `public/projectProposals`,
  filename: (request, response, next) => {
    Team.findById(request.params.id).then((data) => {
      if (!data) next(new Error("Team not found"));
      else
        next(
          null,
          request.role +
            request.id +
            "_" +
            new Date().getTime() +
            "_" +
            response.originalname
        );
    });
  },
});

module.exports.filesUpload = multer({
  storage: filesStorage,
  limits: {
    fileSize: 300000000, // 300000000 Bytes = 0.3 GB
  },
  fileFilter(request, response, next) {
    console.log(response);
    if (!response.originalname.match(fileExtRegex)) {
      return next(new Error("Please upload a File"));
    }
    next(undefined, true);
  },
}).array("files", 2);

module.exports.createProposal = (request, response, next) => {
  //🟢
  Project.findOne({
    // "proposals.talent": { id: request.id, type: request.role + "s" },
    _id: request.params.id,
  })
    .then((project) => {
      if (!project) {
        let object = {};
        for (let prop in request.body) {
          object[prop] = request.body[prop];
        }
        object.talent = {
          id: request.id,
          type: request.role + "s",
        };
        project.proposals.push(object);
        request.connects = project.connects;
        project.save();
        next();
      } else
        next(
          new Error(
            "proposal already exists for this project or project not found"
          )
        );
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProjectProposals = (request, response, next) => {
  Project.findById(request.params.id, { proposals: 1 })
    .populate({ path: "proposals.talent" }) //not working
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else if (request.role == "admin") {
      } else if (
        !(
          data.recruiter.type ==
            (request.role == "company" ? request.role : request.role + "s") &&
          data.recruiter.id == request.id
        )
      ) {
        next(new Error("you're not the owner of this project"));
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.selectProposal = (request, response, next) => {
  Project.findById(request.params.id, { proposals: 1 })
    .populate({ path: "proposals.talent" })
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else if (request.role == "admin") {
      } else if (
        !(
          data.recruiter.type ==
            (request.role == "company" ? request.role : request.role + "s") &&
          data.recruiter.id == request.id
        )
      ) {
        next(new Error("you're not the owner of this project"));
      } else {
        for (let proposal of data.proposals) {
          if (
            proposal.talent.id == request.body.talent.id &&
            proposal.talent.type == request.body.talent.type
          ) {
            data.proposals = [proposal];
            break;
          } else {
            next(new Error("talent not found "));
          }
        }
        data.talent = request.body.talent;
        data.status = "ongoing";
        data.startTime = new Date();
        return data.save().then((data) => {
          next();
          // response.status(201).json({ msg: "Proposal selected", data });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.finishProject = (request, response, next) => {
  Project.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else if (request.role == "admin") {
      } else if (
        !(
          data.recruiter.type ==
            (request.role == "company" ? request.role : request.role + "s") &&
          data.recruiter.id == request.id
        )
      ) {
        next(new Error("you're not the owner of this project"));
      } else {
        data.status = "finished";
        return data.save().then((data) => {
          let Talent;
          if (data.talent.type == "freelancers") Talent = Freelancer;
          else if (data.talent.type == "teams") Talent = Team;
          else next(new Error("invalid talent type"));

          Talent.findOne({ projects: request.params.id }).then((talent) => {
            if (!talent) next(new Error("Project not found"));
            let testimonial = {};
            testimonial.project = request.params.id;
            testimonial.issued = new Date();
            testimonial.rating = request.body.rating;
            testimonial.comment = request.body.comment;
            talent.testimonials.push(testimonial);

            talent.analytics.earnings += data.budget;
            talent.analytics.hours += data.duration;
            talent.analytics.jobs += 1;
            //🟢talent.wallet +=talent.project.budget;
            return talent.save().then((talent) => {
              response.status(200).json({
                msg: "testimonial created",
                talent: talent.testimonials,
              });
            });
          });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
