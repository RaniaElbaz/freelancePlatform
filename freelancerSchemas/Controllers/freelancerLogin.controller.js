const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

require("./../Models/freelancers.model");

let Freelancer = mongoose.model("freelancers");
/**
 * login handler
 *  pass the email and password
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
module.exports.login = (request, response, next) => {
  Freelancer.findOne({
    email: request.body.email,
    password: request.body.password,
  })
    .then((data) => {
      if (!data) {
        let error = new Error("username or password incorrect");
        error.status = 401;
        throw error;
      }
      response.status(200).json({ message: "login" });
      /***************** */
      //   bcrypt
      //     .compare(request.body.password, data.password)
      //     .then(function (result) {
      //       if (result == true) {
      //         let token = jwt.sign(
      //           {
      //             id: data._id,
      //             role: "Freelancer",
      //           },
      //           process.env.SECRET_KEY,
      //           { expiresIn: "1h" }
      //         );
      //         response.status(200).json({ token, message: "login" });
      //       } else {
      //         throw Error("password unmatched");
      //       }
      //     });
    })
    .catch((error) => next(error));
};
