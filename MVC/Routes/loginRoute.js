const express = require("express");
const controller = require("./../Controllers/loginController");



const router = express.Router();

router.post("/login/admin", controller.adminLogin);
router.post("/login/client", controller.clientLogin);
router.post("/login/freelancer", controller.freelancerLogin);


router.put("/reset/admin", controller.adminReset);
router.put("/reset/client", controller.clientReset);
router.put("/reset/freelancer", controller.freelancerReset);


router.put("/change/admin", controller.adminReset);
router.put("/change/client", controller.clientReset);
router.put("/change/freelancer", controller.freelancerReset);





module.exports = router;