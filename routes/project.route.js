const express = require("express");

const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/project.controller");
const mw = require("../middlewares/project.MW");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllProjects)
  .post(mw.post, validationMW, controller.createProject);

router
  .route("/:id")
  .put(mw.put, validationMW, controller.updateProject)
  .all(mw.getDelete, validationMW)
  .get(controller.getProjectById)
  .delete(controller.deleteProject);

router
  .route("/:id/proposal")
  .put(mw.createProposal, validationMW, controller.createProposal);

module.exports = router;
