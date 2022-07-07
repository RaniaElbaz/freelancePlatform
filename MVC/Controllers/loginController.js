let Client = require("../Models/clientSchema");
// const Team = require("./../Models/teamSchema");
// const Freelancer = require("./../Models/freelancerSchema");
// const Project = require("./../Models/projectSchema");
// const Admin = require("./../Models/adminSchema");

const jwt = require("jsonwebtoken");

/**************
 *    & Login
 * **************** */
module.exports.adminLogin = (req, res, next) => {


};

module.exports.clientLogin = (req, res, next) => {
  Client.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then(data => {
      if (!data) { // user not found
        let error = new Error("Incorrect Username or Password!")
        error.status = 401;
        throw error;
      } else {
        let token = jwt.sign({
          id: data._id,
          role: "client"
        }, process.env.secret, { expiresIn: "1h" });
        res.status(200).json({ token, message: "ClientLogin" })
      }
    })
    .catch(error => next(error))

};

module.exports.freelancerLogin = (req, res, next) => {


};

module.exports.teamLogin = (req, res, next) => {


};


/**************
 *    & Reset Password
 * **************** */


module.exports.adminReset = (req, res, next) => {

};

module.exports.clientReset = (req, res, next) => {

};

module.exports.freelancerReset = (req, res, next) => {

};
module.exports.teamReset = (req, res, next) => {

};