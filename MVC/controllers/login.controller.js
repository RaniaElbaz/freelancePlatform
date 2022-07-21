const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let Freelancer = mongoose.model("freelancers");
// let Client = mongoose.model("clients");
// let Company = mongoose.model("companies");

module.exports.login = (request, response, next) => {
  request.params.userType === "freelancer" ? (User = Freelancer) : null;
  User.findOne(
    {
      email: request.body.email,
    },
    { email: 1, password: 1, isBlocked: 1 }
  )
    .then((data) => {
      if (!data) {
        //email not found
        let error = new Error("username or password incorrect");
        error.status = 401;
        next(error);
      }
      if (data.isBlocked) {
        //user is blocked
        next(new Error("log in failed"));
      }
      if (bcrypt.compareSync(request.body.password, data.password)) {
        let token = jwt.sign(
          {
            id: data._id,
            role: request.params.userType,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        response.status(200).json({ token, message: "logged in" });
      }
      else {
        next(new Error("password unmatched"));
      }
    })
    .catch((error) => next(error));
};
