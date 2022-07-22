const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/freelancers.model")
require("../models/admins.model")
const Freelancer = mongoose.model("freelancers");
const Admin = mongoose.model("admins");
const Company = require("../models/company.model")
const Client = require("../models/client.model")

module.exports.changePassword = (request, response, next) => {
  let User = null;
  request.role === "freelancer"
    ? (User = Freelancer)
    : request.role === "admin"
    ? (User = Admin)
    : request.role === "company"
    ? (User = Company)
    : request.role === "client"
    ? (User = Client)
    : null;

  //already logged in
  User.findOne({ _id: request.id }, { email: 1, password: 1 })
    .then((data) => {
      if (!data) {
        //user not found
        let error = new Error("invalid request");
        error.status = 400;
        next(error);
      } else {
        //user found
        if (data.email !== request.body.email) {
          next("username or password incorrect!");
        } else if (
          bcrypt.compareSync(request.body.oldPassword, data.password)
        ) {
          //old password = true
          if (bcrypt.compareSync(request.body.password, data.password)) {
            // new password = old password
            next(new Error("new password cant be the same old password")); //error
          } else {
            data.password = bcrypt.hashSync(request.body.password, 10);
            data.save();
            response.status(201).json({ data: "password changed" });
          }
        } else {
          next(new Error("username or password incorrect"));
        }
      }
    })
    .catch((error) => next(error));
};
