const express = require("express");
const path = require('node:path');
const { body, param, query } = require("express-validator");

const multer = require("multer");
// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/profileImages/clients/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.id}_${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  // here we can accept or reject files
  if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
    cb(null, true); // accept file: store it
    // cb(new Error("Image format not supported!"), true); 
  } else {
    cb(null, false); // ignore file: not stored
  }
}

const upload = multer({
  storage, limits: {
    // fileSize: 1000000 Bytes = 1 MB
    fileSize: 1024 * 1024 * 5 // 5 MB
  },
  fileFilter
});




const {
  getAllClients,
  getClientById,
  // signUp,
  updateClient,
  deleteClient,
  updateTestimonials,
  updatePassword,
  blockClient,
  uploadImage,
  deleteTestimonial
} = require("../Controllers/client.controller");

const {
  updateVA,
  // signUpVA,
  updatePasswordVA,
  blockClientVA,
  testimonialVA
} = require("../middlewares/client.MW");

const {
  adminAuth,
  clientAuth,
  AdminAndClientAuth,
  allAuth,
  freelancerAuth,
  freelancerAndCompanyAuth
} = require("../Middlewares/usersAuth.MW");
const validationMW = require("../Middlewares/validation.MW");
const authMW = require("../Middlewares/auth.MW");


const router = express.Router();


// authMw => roleAuth (authorization) => validationArray => validationMW => controller
router.route("/client")
  .get(authMW, adminAuth, getAllClients)

router.route("/client/:id")
  .all([
    param("id").isNumeric().withMessage("Id isn't correct")
  ])
  .get(authMW, allAuth, getClientById)
  .put(
    authMW,
    AdminAndClientAuth,
    updateVA,
    validationMW,
    updateClient
  )
  .delete(authMW, adminAuth, deleteClient);



router.put("/client/:id/uploadImage", authMW, AdminAndClientAuth, upload.single("picture"), uploadImage)


router.put("/client/:id/updatePassword", updatePasswordVA, updatePassword) // ^ authorization handled by using token

router.put(
  "/client/:id/blockClient",
  authMW,
  adminAuth,
  blockClientVA,
  blockClient
)



router.route("/client/:id/testimonials")
  .put(authMW, freelancerAuth, updateTestimonials)
  .delete(
    authMW, freelancerAndCompanyAuth,
    testimonialVA,
    validationMW,
    deleteTestimonial
  );


module.exports = router;