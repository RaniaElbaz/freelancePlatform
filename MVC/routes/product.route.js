const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const Controller = require("../controllers/product.controller");
let validationMW = require("../middlewares/validation.MW");

router
  .route("/product")
  //get
  .get(Controller.getAllProduct,validationMW, Controller.createProduct);

//create
router
  .route("/product/upload")
  .post(/*productValidtionArray.body*/ validationMW, Controller.createProduct);

//get by id
router
  .route("/product/:id")
  .get([param("id").isNumeric().withMessage("product id should be object")],
    validationMW,Controller.getProductById)

  //put by id
  .put(/*productValidtionArray.param,*/ validationMW, Controller.updateProduct)

  //delete
  .delete(
    [body("id").isNumeric().withMessage("product id should be object")],
    Controller.deleteProduct
  )
module.exports = router;
