const mongoose = require("mongoose");

require("../models/team.model");
let Team = mongoose.model("teams");

require("../models/project.model");
let Project = mongoose.model("projects");

module.exports.createTeam = (request, response, next) => {
  let object = new Team({
    name: request.body.name,
    description: request.body.description,
    hourlyRate: request.body.hourlyRate,
    logo: request.body.logo,
    members: request.body.members,
    skills: request.body.skills,
  });
  Team.findOne({
    $or: [{ members: request.body.members }, { name: request.body.name }],
  })
    .then((team) => {
      if (!team) {
        object.save().then((data) => {
          response.status(201).json({ msg: "team created", data });
        });
      } else {
        throw new Error(
          "team members already exist in another team or team name already token"
        );
      }
    })
    .catch((error) => next(error));
};

module.exports.getAllTeams = (request, response, next) => {
  Team.find(
    {},
    { members: 0, projects: 0, portfolios: 0, testimonials: 0, wallet: 0 }
  )
    .populate({ path: "members", select: "fullName" })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "projects", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getTeamByIdPrivate = (request, response, next) => {
  Team.findOne({ _id: request.params.id }, { wallet: 0 })
    .populate({ path: "members", select: "fullName" })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "projects", select: "name" })
    .then((data) => {
      if (!data.members.includes(request.id))
        next(new Error("not team member"));
      if (data == null) next(new Error("team not found"));
      else {
        request.id = data.id;
        request.role = "team";
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateTeam = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("team not found"));
      else if (!data.members.includes(request.id))
        throw new Error("not team member");

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
            [...request.body[prop]].length ===
            new Set([...request.body[prop]]).size
          )
            data[prop] = [...new Set([...request.body[prop]])];
          else throw new Error(`team ${prop} should be unique`);
          if ([...request.body[prop]].length > 16) {
            throw new Error(`team ${prop} should be less than 16`);
          }
        } else if (
          prop == "testimonials" ||
          prop == "analytics" ||
          prop == "wallet" ||
          prop == "isVerified" ||
          prop == "projects"
        )
          continue;
        else data[prop] = request.body[prop] || data[prop];
      }
      Team.findOne({ members: data.members, name: { $ne: data.name } }).then(
        (team) => {
          if (team) {
            next(new Error("team members already exist in another team"));
          }
          return data.save().then((data) => {
            response.status(201).json({ msg: "team updated", data });
          });
        }
      );
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTeam = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) {
        next(new Error("Team not found"));
      } else if (!data.members.includes(request.id)) {
        next(new Error("not team member"));
      } else {
        data.delete();
        response.status(200).json({ msg: "team deleted" });
      }
    })
    .catch((error) => next(error));
};

module.exports.createPortfolio = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (!data.members.includes(request.id))
        next(new Error("not team member"));

      let object = {};
      for (let prop in request.body) {
        object[prop] = request.body[prop];
      }
      data.portfolios.push(object);
      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "portfolio created", data: data.portfolios });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updatePortfolio = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (!data.members.includes(request.id))
        next(new Error("not team member"));
      data.portfolios[request.body.index] = request.body.portfolio;
      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "portfolio updated", data: data.portfolios });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deletePortfolio = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (!data.members.includes(request.id))
        next(new Error("not team member"));
      console.log(request.body.index);
      console.log(data.portfolios.length);
      if (request.body.index < data.portfolios.length) {
        data.portfolios.splice(request.body.index, 1);
        return data.save().then(() => {
          response.status(200).json({ msg: "portfolio deleted" });
        });
      } else {
        throw Error("team portfolio not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createTestimonial = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("team not found"));
      Project.findById(request.body.project).then((project) => {
        if (!project) {
          next(new Error("project not found"));
        } else if (
          project.recruiter == { id: request.id, type: request.role + "s" }
        ) {
          let object = {};
          for (let prop in request.body) {
            object[prop] = request.body[prop];
          }
          Team.findOne({ "testimonials.project": request.body.project }).then(
            (team) => {
              if (!team) {
                data.testimonials.push(object);
                data.projects.push(request.body.project);
                return data.save().then((data) => {
                  response.status(200).json({
                    msg: "testimonial created",
                    data: data.testimonials,
                  });
                });
              } else
                next(new Error("testimonial already exists for this project"));
            }
          );
        } else {
          next(
            new Error(
              "you can't create testimonial for this project since you're not the owner"
            )
          );
        }
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTestimonialByProjectId = (request, response, next) => {
  Team.findOne({ "testimonials.project": request.params.pId })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let item of data.testimonials) {
          if (item.project == request.params.pId) {
            data.testimonials.splice(data.testimonials.indexOf(item), 1);
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};

// module.exports.getTestimonialByProjectId = (request, response, next) => {
//   Team.findOne({ "testimonials.project": request.params.pId })
//     // .populate({ path: "project", select: "name" })
//     .then((data) => {
//       console.log(data);
//       if (!data) {
//         next(new Error("testimonial not found"));
//       } else {
//         for (let item of data.testimonials) {
//           if (item.project == request.params.pId) {
//             response.status(200).json({ testimonials: item });
//           }
//         }
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };
