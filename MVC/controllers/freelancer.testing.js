const bcrypt = require("bcrypt");
let Freelancer = require("../models/freelancers.model");

module.exports.freelancerSignup = (req, res, next) => {
  let { firstName, lastName, email, password } = req.body;
  Freelancer.findOne({ email })
    .then((user) => {
      if (user) next(new Error("User is already registered!"));
      bcrypt.hash(password, 10, (error, hash) => {
        let newUser = new Freelancer({
          firstName,
          lastName,
          email,
          password: hash,
        });

        newUser
          .save()
          .then((data) => {
            res.status(200).json({ message: "User SignedUP", data });
          })
          .catch((error) => next(`SignUp Activation Error: ${error}`));
      });
    })
    .catch((error) => next(error));
};
