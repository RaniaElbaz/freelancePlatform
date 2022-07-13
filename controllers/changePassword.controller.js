const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let Freelancer = mongoose.model("freelancers");

module.exports.changePassword = (request, response, next) => {
  //already logged in
  Freelancer.findOne({ _id: request.id }, { password: 1 })
    .then((data) => {
      if (!data) {
        //user not found
        let error = new Error("username or password incorrect!");
        error.status = 401;
        next(error);
      } else {
        //user found
        bcrypt.compare(
          request.body.oldPassword,
          data.password,
          function (error, result) {
            if (error) next(error);
            if (!result) {
              next(new Error("username or password incorrect"));
            } else {
              // correct password
              bcrypt.compare(
                request.body.password,
                data.password,
                function (error, result) {
                  if (error) next(error);
                  if (result) {
                    next(
                      new Error("new password cant be the same old password")
                    );
                  } else {
                    data.password = bcrypt.hashSync(request.body.password, 10);
                    data.save();
                    response.status(201).json({ data: "password changed" });
                  }
                }
              );
            }
          }
        );
      }
    })
    .catch((error) => next(error));
};
