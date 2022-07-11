const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../middlewares/hashPassword.MW");

let Freelancer = mongoose.model("freelancers");

module.exports.changePassword = (request, response, next) => {
  if (request.role == "freelancer") {
    Freelancer.findOne(
      {
        email: request.body.email,
      },
      { email: 1, password: 1 }
    )
      .then((data) => {
        if (!data) {//user not found
          let error = new Error("username or password incorrect!");
          error.status = 401;
          next(error);
        } else {
          bcrypt
            .compare(request.body.oldPassword, data.password)
            .then((result) => {
              if (result) {
                if (request.id == data._id) {
                  bcrypt
                    .compare(request.body.password, data.password)
                    .then((result) => {
                      if (result) next(new Error("new password cant be the same old password"));
                      bcrypt.genSalt(10, function (error, salt) {
                        bcrypt
                          .hash(request.body.password, salt)
                          .then(function (hash) {
                            data.password = hash;
                            data.save();
                            response.status(201).json(data);
                          })
                          .catch((error) => next(error));
                      });
                    });
                } else next(new Error("access denied"));
              } else next(new Error("username or password incorrect"));
            });
        }
      })
      .catch((error) => next(error));
  }
};