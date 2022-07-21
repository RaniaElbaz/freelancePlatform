const mongoose = require("mongoose");
require("../models/admins.model");
let Admin = mongoose.model("admins");

/** signup as an admin
 */
module.exports.addAdmin = (request, response, next) => {
  Admin.find({ email: request.body.email }, { _id: 0, email: 1 })
    .then((data) => {
      if (data.length) {
        next(new Error("email already signed up"));
      } else {
        let adminObject = new Admin({
          _id: request.body.id,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          password: request.body.password,
          email: request.body.email,
        });
        return adminObject.save();
      }
    })
    .then((data) => {
      response.status(201).json({ data: "signup success" });
    })
    .catch((error) => next(error));
};

/** update an admin data (update profile)
 */
module.exports.updateAdminDetails = (request, response, next) => {
  Admin.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("admin not found"));
      for (let key in request.body) {
        console.log(key);
        if (key == "email" || key == "password")
          next(new Error("Invalid request"));
        else if (key == "location") {/*****************location */ 
          for (let locationKey in data[key]) {
            if (request.body.hasOwnProperty(locationKey)) {
              data.location[locationKey] = request.body[locationKey];
            }
          }
        } else data[key] = request.body[key] || data[key];
      }

      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** get admin  by id 
 */
module.exports.getAdminById = (request, response, next) => {
  Admin.findOne(
    { _id: request.params.id },
    { password: 0 }//
  )
    .then((data) => {
      if (data == null) next(new Error("admin not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get all admins
 */
module.exports.getAllAdmins = (request, response, next) => {
  Admin.find(
    {},
    {
      password: 0,
    }
  )
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**delete an admin
 * admin only
 */
module.exports.deleteAdmin = (request, response, next) => {
  Admin.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "delete " + request.params.id });
    })
    .catch((error) => next(error));
};

