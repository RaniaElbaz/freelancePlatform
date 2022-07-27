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
  .get(authorization.allAuth, controller.getAllTeams)
  .post(
    authorization.AdminAndFreelancerAuth,
    mw.post,
    validationMW,
    controller.createTeam
  );

//   .get(controller.getTestimonialByProjectId);

router.route("/:id/create/portfolio").put(
  authorization.AdminAndFreelancerAuth,
  // mw.createPortfolio,
  // validationMW,
  controller.filesUpload,
  controller.createPortfolio
);

router.route("/:id/update/portfolio").put(
  authorization.AdminAndFreelancerAuth,
  // mw.updatePortfolio,
  // validationMW,
  controller.filesUpload,
  controller.updatePortfolio
);

router
  .route("/:id/delete/portfolio")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.deletePortfolio,
    validationMW,
    controller.deletePortfolio
  );

router
  .route("/:id")
  .put(
    authorization.AdminAndFreelancerAuth,
    mw.put,
    validationMW,
    controller.imageUpload,
    controller.updateTeam
  )
  .all(mw.getDelete, validationMW)
  .get(authorization.allAuth, controller.getTeamByIdPublic)
  .delete(authorization.AdminAndFreelancerAuth, controller.deleteTeam);

router
  .route("/:id/private")
  .get(authorization.freelancerAuth, controller.getTeamByIdPrivate);

// router
//   .route("/:id/uploadImage")
//   .post(controller.imageUpload.single("image"), controller.updateImage);

// router
//   .route("/:id/uploadFiles")
//   .post(controller.filesUpload.array("files", 2), controller.updateImage);
//🟢 routes order
module.exports = router;
