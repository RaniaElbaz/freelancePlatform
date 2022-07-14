const mongoose = require("mongoose");

require("../models/project.model");
let Project = mongoose.model("projects");

module.exports.createProject = (request, response, next) => {
  let object = new Project({
    title: request.body.title,
    description: request.body.description,
    isInternship: request.body.isInternship,
    budget: request.body.budget,
    recruiter: request.body.recruiter, //🟡will be fixed = userId
    category: request.body.category,
    skills: request.body.skills,
    duration: request.body.duration,
    connects: request.body.connects,
  });
  if (object.isInternship) delete object.budget; //🔴not working
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
    .populate({ path: "talent" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProjectById = (request, response, next) => {
  Project.findById({ _id: request.params.id })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "talent" })
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
          prop == "proposals"
        ) {
          continue;
        } else data[prop] = request.body[prop] || data[prop];
      }
      console.log(data.isInternship);
      if (data.isInternship == true) delete data.budget; //🔴not working

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
      if (!data) next(new Error("project not found"));
      let object = {};
      for (let prop in request.body) {
        object[prop] = request.body[prop];
      }
      object.project = request.params.id;
      //🟡 object.talent.id = request.id || 🔴teamId
      //🟡 object.talent.type = request.role+"s"
      Project.findOne({ "proposals.talent": request.body.talent }).then(
        (project) => {
          if (!project) {
            data.proposals.push(object);
            data.save();
            response
              .status(200)
              .json({ msg: "proposal created", data: data.proposals });
          } else next(new Error("proposal already exists for this project"));
        }
      );
    })
    .catch((error) => {
      next(error);
    });
};
