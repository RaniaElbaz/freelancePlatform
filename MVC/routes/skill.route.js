const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/skill.Controller");
const mw = require("../middlewares/skill.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(authorization.adminAuth, controller.getAllSkills)
  .post(mw.post, validationMW, authorization.adminAuth, controller.createSkill);

router
  .route("/:id")
  .put(mw.put, validationMW, authorization.adminAuth, controller.updateSkill)
  .all(mw.getDelete, validationMW, authorization.adminAuth)
  .get(controller.getSkillById)
  .delete(controller.deleteSkill);

module.exports = router;
