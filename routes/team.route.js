const express = require("express");

const authorization = require("../middlewares/athorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/team.Controller");
const mw = require("../middlewares/team.MW");
const tmw = require("../middlewares/testimonial.MW");
const router = express.Router();

router
  .route("/")
  .get(authorization.allAuth, controller.getAllTeams) //all users
  .post(
    mw.post,
    validationMW,
    authorization.AdminAndFreelancerAuth,
    controller.createTeam
  ); //freelancer

// router
//   .route("/:id/removeMembers")
//   .put(mw.removeMembers, validationMW, controller.removeMembers);

// router
//   .route("/:id/removeSkills")
//   .put(mw.removeSkills, validationMW, controller.removeSkills);

//🟡will be moved to project routes
router
  .route("/:id/testimonial")
  .put(
    tmw.post,
    validationMW,
    authorization.AdminAndClientAndCompanyAuth,
    controller.createTestimonial
  ); // client or company &🟡 worked with the team

router
  .route("/:id/create/portfolio")
  .put(
    mw.createPortfolio,
    validationMW,
    authorization.AdminAndFreelancerAuth,
    controller.createPortfolio
  ); //freelancer & (member of the team)

router
  .route("/:id/update/portfolio")

  .put(
    mw.updatePortfolio,
    validationMW,
    authorization.AdminAndFreelancerAuth,
    controller.updatePortfolio
  ); //feelancer & (member of the team)

router
  .route("/:id/delete/portfolio")
  .put(
    mw.deletePortfolio,
    validationMW,
    authorization.AdminAndFreelancerAuth,
    controller.deletePortfolio
  ); //feelancer & (member of the team)

router
  .route("/testimonial/:pId")
  .all(tmw.getDelete, validationMW)
  .put(authorization.adminAuth, controller.deleteTestimonialByProjectId); //admin
//   .get(controller.getTestimonialByProjectId);

router
  .route("/:id")
  .put(
    mw.put,
    validationMW,
    authorization.AdminAndFreelancerAuth,
    controller.updateTeam
  ) //admin or freelancer & (member of the team)
  .all(mw.getDelete, validationMW)
  .get(authorization.allAuth, controller.getTeamById) //any user
  .delete(authorization.AdminAndFreelancerAuth, controller.deleteTeam); //freelancer & (member of the team)
module.exports = router;
