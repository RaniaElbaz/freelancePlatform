const express = require("express");

const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/team.Controller");
const mw = require("../middlewares/team.MW");
const tmw = require("../middlewares/testimonial.MW");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllTeams)
  .post(mw.post, validationMW, controller.createTeam);

router
  .route("/:id/removeMember")
  .put(mw.removeMember, validationMW, controller.removeMember);

//🟡will be moved to project routes
router
  .route("/testimonial")
  .put(tmw.post, validationMW, controller.createTestimonial);

// router
//   .route("/testimonial/:pId")
//   .all(tmw.getDelete, validationMW)
//   .put(controller.deleteTestimonialByProjectId)
//   .get(controller.getTestimonialByProjectId);

router
  .route("/:id")
  .put(mw.put, validationMW, controller.updateTeam)
  .all(mw.getDelete, validationMW)
  .get(controller.getTeamById)
  .delete(controller.deleteTeam);
module.exports = router;
