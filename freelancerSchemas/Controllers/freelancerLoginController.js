const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

require("./../Models/freelancers");

let Freelancer = mongoose.model("freelancers");

module.exports.login = (request, response, next) => {
  Freelancer.findOne({
    email: request.body.email,
    password: request.body.password
  })
    .then((data) => {
      if (!data) {
        let error = new Error("username or password incorrect");
        error.status = 401;
        throw error;
      }
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
