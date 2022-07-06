const express = require("express");
const controller = require("./../Controllers/loginController");



const router = express.Router();

router.post("/login", controller.teacherLogin);

module.exports = router;