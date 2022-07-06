const express = require("express");
const { body, param, query } = require("express-validator");


const validationMW = require("./../Middlewares/validationMW");
const controller = require("./../Controllers/searchController");


const router = express.Router();

router.route("/search/job")
  .get(controller.getJob)

router.route("/search/profile/:userType?")
  .get(controller.getProfile)


module.exports = router;