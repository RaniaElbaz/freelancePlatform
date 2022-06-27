const express = require("express");

const validationMW = require("../middlewares/validationMW");
const controller = require("../controllers/team");
const mw = require("../middlewares/team");
const router = express.Router();


router.route("/")
    // .get(
    //     controller.getAllTeams
    // )
    .post(
        mw.post,
        validationMW,
        controller.createTeam
        )
    // .put(
    //     mw.put,
    //     validationMW,
    //     controller.updateTeam
    //     )
    

// router.route("/:id")
//     .all(
//         mw.getDelete,
//         validationMW
//         )
//     .get(
//         controller.getTeamById
//     )
//     .delete(
//         controller.deleteTeam
//     )


module.exports=router;