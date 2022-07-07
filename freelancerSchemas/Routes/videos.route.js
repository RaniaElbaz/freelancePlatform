const express = require("express");
const { body, param } = require("express-validator");

const videoController = require("../Controllers/videoController");

const validationMW = require("../Middlewares/validationMW");
const videoValidation = require("../Middlewares/videoValidation");
const videoRoute = express.Router();

videoRoute.route("/videos")
    .get(videoController.getAllVideos)
    .post(
    //     videoValidation,
    //     [body("education.organization").optional({ checkFalsy: true, nullable: true })
    //     .isAlpha().withMessage("video's education is invalid")],
    // validationMW,
    videoController.addVideo)
    .put(videoController.updateVideo);

videoRoute.route("/videos/:id")
    .delete([
        param("id").isNumeric().withMessage("video id wrong")
    ],
    validationMW,
    videoController.deleteVideo);

module.exports = videoRoute;