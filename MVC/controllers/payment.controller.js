// const mongoose = require("mongoose");
// require("../models/admins.model");
const paypal = require("paypal-rest-sdk");
// let Admin = mongoose.model("admins");

module.exports.pay = (request, response, next) => {
    //create json for payment 
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8080/success",
        cancel_url: "http://localhost:8080/cancel",
      },
      transactions: [
        {
          item_list: {
            items: request.body.products,
          },
          amount: {
            currency: "USD",
            total: request.body.cost,
          },
          description: "payment description.",
        },
      ],
    };
    console.log("creating...");
    //approval_url
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
        next(error);
      } else {
        for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              console.log(payment.links[i].href);
            response.redirect(payment.links[i].href);
          }
        }
      }
    });
}

// //payment success
module.exports.paymentCompleted = (request, response, next) => {
      const payerId = request.query.PayerID;
      const paymentId = request.query.paymentId;

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: "5.00",
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
            if (error) {
            console.log("error completed");
            console.log(error.response);
            next(error);
          } else {
            console.log(JSON.stringify(payment));
            response.send("Success");
          }
        }
      );
};

module.exports.paymentCancelled = (request, response) => {
    response.send("Cancelled");
};