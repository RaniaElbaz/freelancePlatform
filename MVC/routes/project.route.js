const express = require("express");

const {
  AdminAndClientAndCompanyAuth,
  allAuth,
  AdminAndFreelancerAuth,
} = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/project.controller");
const mw = require("../middlewares/project.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(
    // allAuth,//🟡posted only ??and onother route getAll for recruiter??
    controller.getAllProjects
  )
  .post(
    // AdminAndClientAndCompanyAuth,
    mw.post,
    validationMW,
    controller.createProject
  );

router
  .route("/:id")
  .put(
    // AdminAndClientAndCompanyAuth,
    mw.put,
    validationMW,
    controller.updateProject
  )
  .all(mw.getDelete, validationMW)
  .get(
    //allAuth
    controller.getProjectById
  )
  .delete(controller.deleteProject);

router
  .route("/:id/proposal")
  .put(
    //AdminAndFreelancerAuth
    mw.createProposal,
    validationMW,
    controller.createProposal
  )
  .get(
    //AdminAndClientAndCompanyAuth
    controller.getProjectProposals
  );

router.route("/:id/proposal").post(
  //AdminAndClientAndCompanyAuth
  controller.selectProposal
); /* validation MW ?? */
//,addProjectToTalent

router.route("/finish").put(
  //AdminAndClientAndCompanyAuth
  controller.finishProject
); /* validation MW ?? */
//,createTestimonial,updateAnalytic

module.exports = router;
