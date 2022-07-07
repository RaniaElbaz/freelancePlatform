const express = require("express");

const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/category.Controller");
const mw = require("../middlewares/category.MW");
const router = express.Router();

router
  .route("/")
  .get(controller.getAllCategories)
  .post(mw.post, validationMW, controller.createCategory);

router
  .route("/:id")
  .put(mw.paramId, mw.put, validationMW, controller.updateCategory)
  .all(mw.paramId, validationMW)
  .get(controller.getCategoryById)
  .delete(controller.deleteCategory);

module.exports = router;
