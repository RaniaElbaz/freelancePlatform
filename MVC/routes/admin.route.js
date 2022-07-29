const express = require("express");
const { param } = require("express-validator");

const adminController = require("../controllers/admin.controller");
const authMW = require("../middlewares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const { adminAuth } = require("../middlewares/authAccess.MW");
const { hashPassword } = require("../middlewares/hashPassword.MW");
const {
  signupValidator,
  putValidator,
} = require("../middlewares/admin.MW");

const adminRoute = express.Router();

/** admins base route
 */
adminRoute.route("/admin").get(authMW, adminAuth, adminController.getAllAdmins);

/**Register route
 */
adminRoute.route("/admin/register").post(
  authMW,
  adminAuth,
  signupValidator,
  validationMW,
  hashPassword,
  adminController.addAdmin
);

/** update profile details
 */
adminRoute.route("/admin/:id/update").put(
  authMW,
  adminAuth,
  putValidator,
  validationMW,
  adminController.updateAdminDetails
);

/** update profile image */
adminRoute
  .route("/admin/:id/update/image")
  .put(
    authMW,
    adminAuth,
    adminController.imageUpload,
    adminController.updateAdminImage
  );
  
adminRoute
  .route("/admin/:id")
  .all(
    authMW,
    adminAuth,
    [param("id").isNumeric().withMessage("admin id wrong")],
    validationMW
  )
  .get(adminController.getAdminById)
  .delete(adminController.deleteAdmin);

module.exports = adminRoute;
