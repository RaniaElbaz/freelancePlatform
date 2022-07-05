const express = require("express");

const validationMW = require("../middlewares/validationMW");
const controller = require("../controllers/team");
const mw = require("../middlewares/team");
const tmw = require("../middlewares/testimonial");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllTeams)
  .post(mw.post, validationMW, controller.createTeam)
  .put(mw.put, validationMW, controller.updateTeam); //🔴next error

// router.route("/:id/removeMember").put(
//   mw.removeMember, //notworking🔴
//   controller.removeMember
// );

router
  .route("/testimonial")
  .put(tmw.post, validationMW, controller.createTestimonial);

router
  .route("/testimonial/:pId")
  .all(tmw.getDelete, validationMW)
  .put(controller.deleteTestimonialByProjectId)
  .get(controller.getTestimonialByProjectId);

router
  .route("/:id")
  .all(mw.getDelete, validationMW)
  .get(controller.getTeamById)
  .delete(controller.deleteTeam);
module.exports = router;
