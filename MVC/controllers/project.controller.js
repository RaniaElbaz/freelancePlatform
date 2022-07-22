const mongoose = require("mongoose");

require("../models/project.model");
let Project = mongoose.model("projects");

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

module.exports.createProposal = (request, response, next) => {
  Project.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("project not found"));
      let object = {};
      for (let prop in request.body) {
        object[prop] = request.body[prop];
      }
      object.talent = {
        id: request.id,
        type: request.role + "s",
      };
      Project.findOne({
        "proposals.talent": { id: request.id, type: request.role + "s" },
      }).then((project) => {
        if (!project) {
          data.proposals.push(object);
          data.save();
          response
            .status(200)
            .json({ msg: "proposal created", data: data.proposals });
        } else next(new Error("proposal already exists for this project"));
      });
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
      else {
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
      else {
        for (let proposal of data.proposals) {
          if (
            proposal.talent.id == request.body.talent.id &&
            proposal.talent.type == request.body.talent.type
          ) {
            data.proposals = [proposal];
            break;
          }
        }
        data.talent = request.body.talent;
        data.status = "ongoing";
        data.startTime = new Date();
        return data.save().then((data) => {
          response.status(201).json({ msg: "Proposal selected", data });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.finishProject = (request, response, next) => {
  Project.findById(request.params.projectId)
    .then((data) => {
      if (!data) next(new Error("project not found"));
      else {
        data.status = "finished";
        return data.save().then((data) => {
          response.status(201).json({ msg: "Project finished", data });
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
