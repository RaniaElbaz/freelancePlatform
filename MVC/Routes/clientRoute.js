const express = require("express");
const { body, param, query } = require("express-validator");

const {
  getAllClients,
  getClientById,
  // signUp,
  updateClient,
  deleteClient,
  updateTestimonials,
  updatePassword,
  blockClient
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


router.put("/client/:id/updatePassword", updatePasswordValidation, updatePassword) // ^ authorization handled by using token

router.put("/client/:id/blockClient", authMW, adminAuth, blockClientVA, blockClient)


router.route("/client/:id/testimonials") // freelancer
  .put(authMW, freelancerAuth, updateTestimonials);
// .delete(controller.updateTestimonials); // ! handling


module.exports = router;