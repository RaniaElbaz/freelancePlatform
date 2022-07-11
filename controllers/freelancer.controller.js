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
      // data.projects.push(request.body.project);
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
      if (request.body.index < data[request.params.detail].length)
        data[request.params.detail][request.body.index] = Object.assign(
          {},
          request.body[request.params.detail]
        );
      else
        throw new Error(`freelancer's ${request.params.detail} not found`);
      return data.save();
      // data[request.params.detail].forEach((object) => { 
      //   if (object.index === request.body[request.params.detail].index) {
      //     object = Object.assign({},request.body[request.params.detail]);
      //     return data.save();
      //   }
      // });
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
      if (request.body.index < data[request.params.detail].length)
        data[request.params.detail].splice(request.body.index, 1);
      else
        throw new Error(`freelancer's ${request.params.detail} not found`)
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
    { wallet: 0, isBlocked: 0 } //password: 0, isBlocked: 0
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

/** delete a testimonial
 * authorized by admin only
 */
module.exports.deleteTestimonialByProjectId = (request, response, next) => {
  Freelancer.findOne({ "testimonials.project": request.body.project })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let item of data.testimonials) {
          if (item.project == request.body.project) {
            data.testimonials.splice(data.testimonials.indexOf(item), 1);
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};