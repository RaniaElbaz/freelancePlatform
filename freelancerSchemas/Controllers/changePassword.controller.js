const mongoose = require("mongoose");

let Freelancer = mongoose.model("freelancers");

module.exports.changePassword = (request, response, next) => {
  if (request.role == "freelancers") {
    Freelancer.findOne(
      {
        email: request.body.email,
      },
      { email: 1, password: 1 }
    )
        .then((data) => {
          console.log(data);
        if (!data) {
          let error = new Error("username or password incorrect");
          error.status = 401;
          throw error;
        } else {
          bcrypt
            .compare(request.body.password, data.password)
            .then((result) => {
              if (result == true) {
                if (request.id == data._id) {
                  bcrypt
                    .compare(request.body.newPassword, data.password)
                    .then((result) => {
                      if (result == true) {
                        next(
                          new Error(
                            "new password cant be the same old password"
                          )
                        );
                      } else {
                        data.password = request.body.newpassword;
                        response.status(201).json(data);
                        data.save();
                      }
                    });
                } else {
                  next(new Error("access denied"));
                }
              } else {
                let error = new Error("username or password incorrect");
                error.status = 401;
                throw error;
              }
            });
        }
      })
      .catch((error) => next(error));
  }
};
