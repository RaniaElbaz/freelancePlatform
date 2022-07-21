const mongoose = require("mongoose");

require("../models/freelancers.model");

let Freelancer = mongoose.model("freelancers");

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
      if (!data.length) throw new Error("freelancer not found");
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
            data.languages = [...new Set([...request.body.languages])];
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
      }
      //array of numbers
      else if (request.params.detail === "skills") {
        data.skills = [...new Set([...request.body.skills])];
        return data.save();
      } else {
        next(new Error("Invalid request"));
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
    "projects",
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
      if (!data) next(new Error("freelancer not found"));
      if (request.body.index < data[request.params.detail].length)
        //index is valid
        //assign updated object to the old object
        data[request.params.detail][request.body.index] = Object.assign(
          {},
          request.body[request.params.detail]
        );
      else next(new Error(`freelancer's ${request.params.detail} not found`));
      return data.save();
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** delete an object in an array (update) data
 */
module.exports.removeData = (request, response, next) => {
  Freelancer.findById(
    { _id: request.params.id },
    { education: 1, certificates: 1, eperience: 1, portfolio: 1 }
  )
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      if (request.body.index < data[request.params.detail].length)
        data[request.params.detail].splice(request.body.index, 1);
      else next(new Error(`freelancer's ${request.params.detail} not found`));
      return data.save();
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** get freelancer data  by id (get profile / public view)
 */
module.exports.getFreelancerPrivate= (request, response, next) => {
  Freelancer.findOne(
    { _id: request.params.id },
    {
      wallet: 0,
      isBlocked: 0,
      password: 0,
      email: 0,
      connects: 0,
      proposals: 0,
    }
  )
    .then((data) => {
      if (data == null) next(new Error("Freelancer not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get freelancer data  by id (get profile/ private view)
 */
module.exports.getFreelancerPublic = (request, response, next) => {
  if (request.id !== request.params.id) next(new Error("not authorized"))
    Freelancer.findOne(
      { _id: request.params.id },
      { isBlocked: 0, password: 0 }
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
 * auth by users
 */
module.exports.getAllFreelancers = (request, response, next) => {
  Freelancer.find(
    {},
    {
      email: 1,
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
 * admin only
 * for dev use only
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
