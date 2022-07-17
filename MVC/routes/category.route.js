const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/category.Controller");
const mw = require("../middlewares/category.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(authorization.adminAuth, controller.getAllCategories)
  .post(
    mw.post,
    validationMW,
    authorization.adminAuth,
    controller.createCategory
  );

router
  .route("/:id")
  .put(
    mw.paramId,
    mw.put,
    validationMW,
    authorization.adminAuth,
    controller.updateCategory
  )
  .all(mw.paramId, validationMW, authorization.adminAuth)
  .get(controller.getCategoryById)
  .delete(controller.deleteCategory);

module.exports = router;
