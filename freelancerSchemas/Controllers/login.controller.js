const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let Freelancer = mongoose.model("freelancers");

module.exports.login = (request, response, next) => {
  Freelancer.findOne({
    email: request.body.email,
    // password: request.body.password
  })
    .then((data) => {
      if (!data) {
        let error = new Error("username or password incorrect");
        error.status = 401;
        throw error;
      }
      if (data.isBlocked) {
        throw new Error("freelancer can't log in");
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
            throw new Error("password unmatched");
          }
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};
