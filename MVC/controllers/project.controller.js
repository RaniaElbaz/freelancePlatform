const mongoose = require("mongoose");
const multer = require("multer");

require("../models/project.model");
let Project = mongoose.model("projects");
let Freelancer = require("../models/freelancers.model");
let Client = require("../models/client.model");
let Company = require("../models/company.model");
let Team = require("../models/team.model");
const { fileExtRegex } = require("../helpers/regex");

const filesStorage = multer.diskStorage({
  destination: `public/proposalsFiles`,
  filename: (request, response, next) => {
    Freelancer.findById(request.params.id).then((data) => {
      if (!data) next(new Error("freelncer not found"));
      else
        next(
          null,
          request.params.id + "_" + request.id + "_" + response.originalname
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
}).array("files", 5);

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
      type: request.role == "company" ? "companies" : request.role + "s",
    },
    category: request.body.category,
    skills: request.body.skills,
    duration: request.body.duration,
    connects: request.body.connects,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ msg: "project created", data });
    })
    .catch((error) => next(error));
};

module.exports.getAllProjects = (request, response, next) => {
  Project.find({})
    .populate({ path: "skills", select: "name" })
    .populate({ path: "category", select: "name" })
    // .populate({ path: "talent" })
    .populate({ path: "proposals.talent" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProjectById = (request, response, next) => {
  Project.findById(request.params.id)
    .populate({ path: "skills", select: "name" })
    .populate({ path: "category", select: "name" })
    // .populate({ path: "talent" })
    .populate({ path: "proposals.talent" })
    .then((data) => {
      if (data == null) next(new Error("project not found"));
      else {
        response.status(200).json(data);
      }
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
      if (!data) next(new Error("project not found"));
      else if (data.status != "posted") {
        throw Error(`can't update project ${data.status}`);
      }
      for (let prop in request.body) {
        if (
          prop == "createdAt" ||
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

module.exports.createProposal = (request, response, next) => {
  Project.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("project not found");
      let object = {};
      for (let prop in request.body) {
        object[prop] = request.body[prop];
      }
      object.files = [];
      request.files.map((file) => {
        object.files.push(
          `${request.protocol}://${request.hostname}:${
            process.env.PORT
          }/${file.path.replaceAll("\\", "/")}`
        );
      });
      object.talent = {
        id: request.id,
        type: request.role + "s",
      };
      data.proposals.forEach((proposal) => {
        if (
          proposal.talent.id === request.id &&
          proposal.talent.type === request.role + "s"
        ) {
          throw new Error("proposal already exists for this project");
        }
      });
      //minus connects
      let User;
      request.role == "freelancer"
        ? (User = Freelancer)
        : request.role == "company"
        ? (User = Company)
        : request.role == "client"
        ? (User = Client)
        : next(new Error("Invalid User type"));
      User.findById(request.id).then((talent) => {
        if (talent.connects > data.connects) {
          //user used a number of connects
          talent.connects -= data.connects;
          //add proposal
          data.proposals.push(object);
          //save data
          return talent.save().then((talent) => {
            return data.save().then((data) => {
              response
                .status(200)
                .json({ msg: "proposal created", data: data.proposals });
            });
          });
        } else {
          throw new Error("not enough connects for this project");
        }
      });
    })
    .catch((error) => {
      next(error);
    });
};
