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
    // allAuth,
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

router.route("/:id/proposal").put(
  //AdminAndFreelancerAuth
  mw.createProposal,
  validationMW,
  controller.createProposal
);

module.exports = router;
