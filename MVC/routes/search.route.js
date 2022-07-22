const express = require("express");
const { body, param, query } = require("express-validator");


const validationMW = require("../Middlewares/validation.MW");
const authMW = require("../Middlewares/auth.MW");
const controller = require("../Controllers/search.controller");


const router = express.Router();


// router.use(authMW, (req, res, next) => {
//   if (req.role == "admin") {
//     next();
//   } else {
//     let error = new Error("Not Authorized");
//     error.status = 403;
//     next(error)
//   }
// });

router.route("/search/job")
  .get(controller.getJob)

router.route("/search/profile/:userType?")
  .get(controller.getProfile)


module.exports = router;