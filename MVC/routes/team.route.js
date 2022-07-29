const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/team.Controller");
const mw = require("../middlewares/team.MW");
const tmw = require("../middlewares/testimonial.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(authorization.allAuth, controller.getAllTeams) //all users
  .post(
    authorization.AdminAndFreelancerAuth,
    mw.post,
    validationMW,
    controller.createTeam
  ); //freelancer

router
  .route("/testimonial/:pId")
  .put(
    authorization.adminAuth,
    tmw.getDelete,
    validationMW,
    controller.deleteTestimonialByProjectId
  ); //admin
//   .get(controller.getTestimonialByProjectId);

//🟡will be moved to project routes
router.route("/:id/testimonial").put(
  authorization.AdminAndClientAndCompanyAuth,
  tmw.post,
  validationMW,
  controller.createTestimonial //🟡test with client or company account
); // client or company & worked with the team

router
  .route("/:id/create/portfolio")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.createPortfolio,
    validationMW,
    controller.createPortfolio
  ); //freelancer & (member of the team)

router
  .route("/:id/update/portfolio")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.updatePortfolio,
    validationMW,
    controller.updatePortfolio
  ); //feelancer & (member of the team)

router
  .route("/:id/delete/portfolio")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.deletePortfolio,
    validationMW,
    controller.deletePortfolio
  ); //feelancer & (member of the team)

router
  .route("/:id")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.put,
    validationMW,
    controller.updateTeam
  ) //admin or freelancer & (member of the team)
  .all(mw.getDelete, validationMW)
  .get(authorization.allAuth, controller.getTeamByIdPrivate) //any user
  .delete(authorization.AdminAndFreelancerAuth, controller.deleteTeam); //freelancer & (member of the team)
module.exports = router;
