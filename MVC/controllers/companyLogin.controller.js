
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let company = require("../Models/company")

module.exports.companyLogin = (request, response, next) => {
    company.findOne(
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
          next(new Error("company can't log in"));
        }
        bcrypt
          .compareSync(request.body.password, data.password) //comparesync -->test
          .then((result) => {
            if (result) {
              //password is correct
              let token = jwt.sign({id: data._id,role: "company",},process.env.SECRET_KEY,{ expiresIn: "1h" });
              response.status(200).json({ token, message: "login" });
            } else {
              next(new Error("password unmatched"));
            }
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));}