const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("./../models/freelancers.model");

let Freelancer = mongoose.model("freelancers");

module.exports.login = (request, response, next) => {
  Freelancer.findOne({
    email: request.body.email,
  })
    .then((data) => {
      if (!data) {
        let error = new Error("username or password incorrect");
        error.status = 401;
        throw error;
      }
      /***************** */
      bcrypt
        .compare(request.body.password, data.password)
        .then((result) => {
          if (result == true) {
            let token = jwt.sign(
              {
                id: data._id,
                role: "freelancer",
              },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            response.status(200).json({ token, message: "login" });
          } else {
            throw Error("password unmatched");
          }
        });
    })
    .catch((error) => next(error));
};
