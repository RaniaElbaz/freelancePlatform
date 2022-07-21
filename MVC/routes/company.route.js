const express = require("express");
const { body, param, query } = require("express-validator");
const companyRoute = express.Router();
const controller = require("../controllers/companyController");
const loginController = require("../controllers/companyLoginController");
let validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");
const { hashPassword } = require("../middlewares/hashPassword.MW");
const {AdminAndCompanyAuth,adminAuth,companyAuth} = require("../middlewares/authAccess.MW");
const companyValidtion =require("../middlewares/company.MW")

companyRoute
  .route("/company")
  //get
  .get(
    authMW,    
    validationMW,
    controller.getAllComapny
  );




//signUp step2 (put details by id)
companyRoute
  .route("/company/:id/Details")
  .put(
    authMW,
    companyAuth,
    validationMW,
    companyValidtion.paramValidator,
    companyValidtion.detailsValidator,
    controller.updateCompanyDetails
  );

//signUp step 3 ( put info by id)
companyRoute
  .route("/company/:id/info")
  .put( authMW,
    companyAuth,
    companyValidtion.paramValidator,
    companyValidtion.infoValidator,
     validationMW, controller.updateCompanyInfo);

//logIn
companyRoute
  .route("/company/login")
  .put(validationMW, loginController.companyLogin);

//get by id (puplic view)
companyRoute
  .route("/company/:id/puplic")
  .get(
    authMW,
    companyValidtion.paramValidator,   
    validationMW,
    controller.getCampanyByIdPuplic
  );

//get by id (private view)
companyRoute
  .route("/company/:id/private")
  .get(
    authMW,companyAuth,
    companyValidtion.paramValidator,  
    validationMW,
    controller.getCampanyByIdPrivate
  );

//delete
companyRoute
  .route("/company/:id")
  .delete(
    authMW,
    AdminAndCompanyAuth,
    companyValidtion.paramValidator,  
    validationMW,
    controller.deleteCompany
  );

//testimonials
companyRoute
  .route("company/:id/update/testimonials")
  .put(
    authMW,AdminAndCompanyAuth,
    companyValidtion.paramValidator,  
    companyValidtion.testimonialValidator,
    validationMW,
    controller.CompanyupdateTestimonials
  );

module.exports = companyRoute;
