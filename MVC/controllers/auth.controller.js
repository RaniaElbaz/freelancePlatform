const mongoose = require("mongoose");

require("../models/freelancers.model");

let Freelancer = mongoose.model("freelancers");

/** signup as a freelancer
 */
module.exports.signup = (request, response, next) => {
  Freelancer.find(
    { email: request.body.email },
    { _id: 0, email: 1, isBlocked: 1 }
  )
    .then((data) => {
      if (data.length) {
        if (data[0].isBlocked) throw new Error("freelancer can't log in");
        else throw new Error("email already signed up");
      } else {
        let freelancerObject = new Freelancer({
          _id: request.body.id,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          password: request.body.password,
          email: request.body.email,
        });
        return freelancerObject.save();
      }
    })
    .then((data) => {
      response.status(201).json({ data: "signup success" });
    })
    .catch((error) => next(error));
};
