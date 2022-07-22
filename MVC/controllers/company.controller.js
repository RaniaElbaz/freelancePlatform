let company = require("../models/company.model");

//get All Companies
module.exports.getAllComapny = (req, res, next) => {
  company
    .find({}, { password: 0 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one puplic
module.exports.getCampanyByIdPuplic = (req, res, next) => {
  company
    .findOne(
      {
        _id: req.params.id,
      },
      { password: 0, wallet: 0, isBlocked: 0 }
    )
    .then((data) => {
      if (data == null) next(new Error("company not found"));
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one privte check id

module.exports.getCampanyByIdPrivate = (req, res, next) => {
  company
    .findOne(
      {
        _id: req.params.id,
      },
      { password: 0, isBlocked: 0 }
    )
    .then((data) => {
      if (data == null) next(new Error("company not found"));
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateCompanyDetails = (req, res, next) => {
  company
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      for (let item in req.body) {
        if (item == "location") {
          for (let nestedItem in req.body[item]) {
            if (request.body.hasOwnProperty(nestedItem)) {
              data.location[nestedItem] = request.body[nestedItem];
            }
            // if (["postalCode", "state", "city", "address"].includes(nestedItem)) { //address&city&state Not object
            //   data["location"][nestedItem] = req.body["location"][nestedItem];
            // }
          }
        } else data[item] = req.body[item] || data[item];
      }
      res.status(200).json({ data });
      return data.save();
    })

    .catch((error) => {
      next(error);
    });
};

// other function isblocked ,wallet , analytics, isverfiied
module.exports.updateCompanyInfo = (request, response, next) => {
  const backInfo = ["analytics", "isVerified", "isBlocked", "wallet"];
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("company not found");
      for (let key of backInfo) {
        if (key === "analytics") {
          for (let analyticKey in data[key]) {
            if (request.body.hasOwnProperty(analyticKey)) {
              data.analytics[analyticKey] = request.body[analyticKey];
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

//delete one company
module.exports.deleteCompany = (req, res, next) => {
  company
    .deleteOne({
      _id: req.body.id,
    })
    .then((data) => {
      res.status(200).json({
        data: "deleted",
      });
    })
    .catch((error) => next(error));
};

//Testimonials

module.exports.CompanyupdateTestimonials = (req, res, next) => {
  company
    .findById(req.params.id)
    .then((data) => {
      if (!data) throw new Error("Company not found!");

      let TestimonialObject = {};
      console.log(TestimonialObject);
      for (let key in req.body) {
        TestimonialObject[key] = req.body[key];
        console.log(TestimonialObject);
      }
      data.testimonials.push(TestimonialObject);
      data.projects.push(req.body.project);
      return data.save();
    })
    .then((data) => {
      res.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};
