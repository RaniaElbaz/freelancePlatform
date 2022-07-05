const mongoose = require("mongoose");

require("./../models/team");
let Team = mongoose.model("teams");

module.exports.createTeam = (request, response, next) => {
  let object = new Team({
    name: request.body.name,
    description: request.body.description,
    hourlyRate: request.body.hourlyRate,
    logo: request.body.logo,
    members: request.body.members,
    skills: request.body.skills,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ msg: "team created", data });
    })
    .catch((error) => next(error));
};

module.exports.getAllTeams = (request, response, next) => {
  Team.find({})
    // .populate({ path: "members", select: "fullName" })
    // .populate({ path: "skills", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getTeamById = (request, response, next) => {
  Team.findOne({ _id: request.params.id })
    // .populate({ path: "members", select: "fullName" })
    // .populate({ path: "skills", select: "name" })
    .then((data) => {
      if (data == null) next(new Error("team not found"));
      else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateTeam = (request, response, next) => {
  Team.findById(request.body.id)
    .then((data) => {
      if (!data) next(new Error("team not found"));
      for (let prop in request.body) {
        if (prop == "name") {
          if (request.body[prop] == data[prop]) {
            continue;
          }
          Team.findOne({ name: request.body.name }).then((repeatedData) => {
            if (repeatedData) {
              next(new Error("team name is already token"));
            } else {
              data[prop] = request.body[prop];
            }
          });
        } else if (prop == "members" || prop == "skills") {
          if (
            [...data[prop], ...request.body[prop]].length ===
            [...new Set([...data[prop], ...request.body[prop]])].length
          )
            data[prop] = [...new Set([...data[prop], ...request.body[prop]])];
          else next(new Error(`team ${prop} should be unique`));
        } else if (
          prop == "testimonial" ||
          prop == "analytic" ||
          prop == "wallet" ||
          prop == "isVerified"
        )
          continue;
        else data[prop] = request.body[prop] || data[prop];
      }
      data.save().then((data) => {
        response.status(200).json({ msg: "team updated", data });
      });
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTeam = (request, response, next) => {
  Team.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("Team not found"));
      } else response.status(200).json({ msg: "team deleted" });
    })
    .catch((error) => next(error));
};

module.exports.removeMember = (request, response, next) => {
  //🔴remove more than one member
  Team.findById({ _id: request.params.id })
    .then((data) => {
      if (data.members.length < 3) {
        next(new Error("can't remove any team member (team members are 2)"));
      } else if (data.members.indexOf(request.body.member) != -1) {
        data.members.splice(data.members.indexOf(request.body.member), 1);
        data.save();
        response
          .status(200)
          .json({ msg: "team member removed", members: data.members });
      } else {
        next(new Error("team member not found"));
      }
    })
    .catch((error) => next(error));
};

module.exports.createTestimonial = (request, response, next) => {
  Team.findById(request.body.teamId)
    .then((data) => {
      if (!data) next(new Error("team not found"));
      let object = {};
      for (let prop in request.body) {
        if (prop != "teamId") {
          object[prop] = request.body[prop];
        } else continue;
      }
      Team.find({ "testimonial.project": request.body.project }).then(
        (team) => {
          if (team === []) {
            data.testimonial.push(object);
            data.save();
            response
              .status(200)
              .json({ msg: "testimonial created", data: data.testimonial });
          } else next(new Error("testimonial already exists for this project"));
        }
      );
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTestimonialByProjectId = (request, response, next) => {
  Team.findOne({ "testimonial.project": request.params.pId })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let item of data.testimonial) {
          if (item.project == request.params.pId) {
            data.testimonial.splice(data.testimonial.indexOf(item), 1);
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};

module.exports.getTestimonialByProjectId = (request, response, next) => {
  Team.findOne({ "testimonial.project": request.params.pId })
    // .populate({ path: "project", select: "name" })
    .then((data) => {
      if (!data) {
        console.log(data);
        next(new Error("testimonial not found"));
      } else {
        for (let item of data.testimonial) {
          if (item.project == request.params.pId) {
            response.status(200).json({ testimonial: item });
          }
        }
      }
    })
    .catch((error) => {
      next(error);
    });
};
