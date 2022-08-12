const express = require("express");
const validationMW = require("../middlewares/validation.MW");
const paymentController = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.route("/payment").post(paymentController.pay);
paymentRouter.route("/success").get(paymentController.paymentCompleted);

module.exports = paymentRouter;