const mongoose = require("mongoose");
require("../models/product.model");

let product = mongoose.model("products");

//get All products
module.exports.getAllProduct = (req, res, next) => {
  product
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one
module.exports.getProductById = (req, res, next) => {
  product
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      if (data == null) next(new Error("product not found"));
      data.views += 1;
      data.save(); //----->test
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//create product
module.exports.createProduct = (req, res, next) => {
  product.find({ name: req.body.name }).then((data) => {
    if (data.length) {
      throw new Error("name already exist");
    } else {
      let productobject = new product({
        _id: req.body.id,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        skills: req.body.skills,
        ownerId: req.body.ownerId, //sent by frontend
        ownerModel: req.body.ownerModel  //sent by frontend
      });

      productobject
        .save()
        .then((data) => {
          res.status(201).json({ msg: "product created sucessfully" });
        })
        .catch((error) => next(error));
    }
  });
};

//get update  property product
module.exports.updateProduct = (req, res, next) => {
  product
    .findOne({
      _id: req.params.id,
    }).populate({ path: "ownerId", select: "name" })
    .then((data) => {
      for (let item in req.body) {
        data[item] = req.body[item];
      }
      res.status(200).json({ data });
      return data.save();
    })

    .catch((error) => {
      next(error);
    });
};

//delete one product
module.exports.deleteProduct = (req, res, next) => {
  product
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

module.exports.productUpdateTestimonials = (req, res, next) => {
  product
    .findById(req.params.id)
    .then((data) => {
      if (!data) throw new Error("Product not found!");

      let TestimonialObject = {};
      console.log(TestimonialObject);
      for (let key in req.body) {
        TestimonialObject[key] = req.body[key];
        console.log(TestimonialObject);
      }
      data.testimonials.push(TestimonialObject);
      data.projects = req.body.project;
      return data.save();
    })
    .then((data) => {
      res.status(201).json({ msg: "updated" });
    })
    .catch((error) => next(error));
};
