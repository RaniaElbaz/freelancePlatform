const express = require("express");

const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/team.Controller");
const mw = require("../middlewares/team.MW");
const tmw = require("../middlewares/testimonial.MW");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllTeams) //all users
  .post(mw.post, validationMW, controller.createTeam); //freelancer

// router
//   .route("/:id/removeMembers")
//   .put(mw.removeMembers, validationMW, controller.removeMembers);

// router
//   .route("/:id/removeSkills")
//   .put(mw.removeSkills, validationMW, controller.removeSkills);

//🟡will be moved to project routes
router
  .route("/:id/testimonial")
  .put(tmw.post, validationMW, controller.createTestimonial); // client or company &🟡 worked with the team

router
  .route("/:id/create/portfolio")
  .put(mw.createPortfolio, validationMW, controller.createPortfolio); //freelancer & (member of the team)

router
  .route("/:id/update/portfolio")

  .put(mw.updatePortfolio, validationMW, controller.updatePortfolio); //feelancer & (member of the team)

router
  .route("/:id/delete/portfolio")
  .put(mw.deletePortfolio, validationMW, controller.deletePortfolio); //feelancer & (member of the team)

router
  .route("/testimonial/:pId")
  .all(tmw.getDelete, validationMW)
  .put(controller.deleteTestimonialByProjectId); //admin
//   .get(controller.getTestimonialByProjectId);

router
  .route("/:id")
  .put(mw.put, validationMW, controller.updateTeam) //freelancer & (member of the team)
  .all(mw.getDelete, validationMW)
  .get(controller.getTeamById) //any user
  .delete(controller.deleteTeam); //freelancer & (member of the team)
module.exports = router;
