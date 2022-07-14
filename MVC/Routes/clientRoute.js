const express = require("express");
const { body, param, query } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
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
  // cb(true); // return error
}

const upload = multer({
  storage, limits: {
    fileSize: 1024 * 1024 * 5
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
  uploadImage
} = require("../Controllers/clientController");
const {
  updateValidation,
  // signUpValidation,
  updatePasswordValidation,
  blockClientVA
} = require("../Models/clientValidationArray");
const {
  adminAuth,
  clientAuth,
  AdminAndClientAuth,
  allAuth,
  freelancerAuth
} = require("../Middlewares/usersAuthMW");
const validationMW = require("../Middlewares/validationMW");
const authMW = require("../Middlewares/authMW");

const router = express.Router();


// authMw => roleAuth (authorization) => validationArray => validationMW => controller
router.route("/client")
  .get(authMW, adminAuth, getAllClients) // admin
// .post(authMW, AdminAndClientAuth, signUpValidation, validationMW, signUp)


router.route("/client/:id")
  .all([
    param("id").isNumeric().withMessage("Id isn't correct")
  ])
  .get(authMW, allAuth, getClientById) // admin & client & freelancer & company
  .put(authMW, AdminAndClientAuth, updateValidation, validationMW, updateClient) // Admin & client
  .delete(authMW, adminAuth, deleteClient); // admin



router.put("/client/:id/uploadImage", authMW, AdminAndClientAuth, upload.single("picture"), uploadImage) // client

router.put("/client/:id/updatePassword", updatePasswordValidation, updatePassword) // ^ authorization handled by using token

router.put("/client/:id/blockClient", authMW, adminAuth, blockClientVA, blockClient)


router.route("/client/:id/testimonials") // freelancer
  .put(authMW, freelancerAuth, updateTestimonials);
// .delete(controller.updateTestimonials); // ! handling


module.exports = router;