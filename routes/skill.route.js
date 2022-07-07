const express = require("express");

const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/skill.Controller");
const mw = require("../middlewares/skill.MW");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllSkills)
  .post(mw.post, validationMW, controller.createSkill);

router
  .route("/:id")
  .put(mw.put, validationMW, controller.updateSkill)
  .all(mw.getDelete, validationMW)
  .get(controller.getSkillById)
  .delete(controller.deleteSkill);

module.exports = router;
