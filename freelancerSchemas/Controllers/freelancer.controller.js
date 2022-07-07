const mongoose = require("mongoose");

require("../Models/freelancers.model");

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
        if (data[0].isBlocked) throw new Error("access denied");
        else throw new Error("email already signed up");
      } else {
        let freelancerObject = new Freelancer({
          _id: request.body.id,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          password: request.body.password,
          email: request.body.email,
        });
        freelancerObject.save();
      }
    })
    .then((data) => {
      response.status(201).json({ data: "signup success" });
    })
    .catch((error) => next(error));
};

/** update a freelancer data (update profile)
 */
module.exports.updateFreelancerDetails = (request, response, next) => {
  const profileDetails = [
    "firstName",
    "lastName",
    "address",
    "title",
    "description",
    "languages",
    "phoneNumber",
    "profileImage",
    "hoursPerWeek",
    "hourlyRate",
  ];
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("freelancer not found");
      //info
      if (request.params.detail === "details") {
        for (let key of profileDetails) {
          if (key == "address") {
            /*****************address */
            for (let addressKey in data[key]) {
              if (request.body.hasOwnProperty(addressKey)) {
                data.address[addressKey] = request.body[addressKey];
              }
            }
          } else if (key === "languages" && request.body[key]) {
            /*****************languages */
            data.languages = [
              ...new Set([...data.languages, ...request.body.languages]),
            ];
          } else data[key] = request.body[key] || data[key];
        }
        return data.save();
      }
      //array of objects
      else if (
        ["certificates", "education", "experience", "portfolio"].includes(
          request.params.detail
        )
      ) {
        let detailObject = {};
        for (let key in request.body) {
          detailObject[key] = request.body[key];
        }
        detailObject.index = data[request.params.detail].length;
        data[request.params.detail].push(detailObject);
        return data.save();
      } else if (request.params.detail === "skills") {
        data.skills = [...new Set([...data.skills, ...request.body.skills])];
        return data.save();
      } else {
        throw new Error("Invalid request");
      }
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** update a freelancer data (update projects and testimonials)
 */
module.exports.updateFreelancerTestimonials = (request, response, next) => {
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("freelancer not found");
      testimonialObject = {};
      for (let key in request.body) {
        testimonialObject[key] = request.body[key];
      }
      data.testimonials.push(testimonialObject);
      data.projects = request.body.testimonialProject;
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** update a freelancer data (update back end data)
 */
module.exports.updateFreelancerInfo = (request, response, next) => {
  const backInfo = [
    "analytics",
    "badges",
    "connects",
    "isVerified",
    "isBlocked",
    "wallet",
  ];
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("freelancer not found");
      for (let key of backInfo) {
        if (key === "analytics") {
          for (let analyticKey in data[key]) {
            if (request.body.hasOwnProperty(analyticKey)) {
              data.analytics[analyticKey] = request.body[analyticKey];
            }
          }
        } else if (key === "badges" && request.body[key]) {
          /*****************badges */
          data.badges = [...new Set([...data.badges, ...request.body.badges])];
        } else data[key] = request.body[key] || data[key];
      }
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** edit an object in an array (update)
 */
module.exports.editData = (request, response, next) => {
  Freelancer.findById(
    { _id: request.params.id },
    { education: 1, certificates: 1, eperience: 1, portfolio: 1 }
  )
    .then((data) => {
      if (!data) throw new Error("freelancer not found");
      data[request.params.detail].forEach((object) => { 
        if (object.index === request.body[request.params.detail].index) {
          object = Object.assign({},request.body[request.params.detail]);
          return data.save();
        }
      });
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** delete (update) data
 */
module.exports.removeData = (request, response, next) => {
  Freelancer.findById(
    { _id: request.params.id },
    { education: 1, certificates: 1, eperience: 1, portfolio: 1 }
  )
    .then((data) => {
      if (!data) throw new Error("freelancer not found");
      request.body[request.params.detail].forEach((index) => {
        data[request.params.detail] = data[request.params.detail].filter(object => object.index !== index);
      });
      return data.save();
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** get freelancer data  by id (get profile)
 */
module.exports.getFreelancerById = (request, response, next) => {
  Freelancer.findOne(
    { _id: request.params.id },
    { password: 0, wallet: 0, isBlocked: 0 }
  )
    .then((data) => {
      if (data == null) next(new Error("Freelancer not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get all freelancer data
 */
module.exports.getAllFreelancers = (request, response, next) => {
  Freelancer.find(
    {},
    {
      skills: 1,
      description: 1,
      firstName: 1,
      lastName: 1,
      title: 1,
      analytics: 1,
    }
  )
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**delete a freelancer
 */
module.exports.deleteFreelancer = (request, response, next) => {
  Freelancer.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "delete " + request.params.id });
    })
    .catch((error) => next(error));
};
