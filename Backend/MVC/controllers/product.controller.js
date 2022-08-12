const mongoose = require("mongoose");
require("../models/product.model");

let product = mongoose.model("products");

/************multer */
const multer = require("multer");
const path = require("path");

const productStorage = multer.diskStorage({
  // Destination to store image
  destination: (re, file, cb) => {
    cb(null, "./public/uploads/product");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.imageUpload = multer({
  storage: productStorage,
  limits: {
    fileSize: 1000000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(zip)$/)) {
      return cb(new Error("Please upload a product"));
    }
    cb(undefined, true);
  },
});
/****************************/

//get All products
module.exports.getAllProduct = (req, res, next) => {
  product
    .find({})
    .populate("ownerId")
    // .populate({ path: "ownerId", select: "name" })
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
    .populate("ownerId")
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
  product.findOne({ name: req.body.name }).then((data) => {
    console.log(data);
    if (data.length) {
      next(new Error("name already exist"));
    } else {
      let productPath = "";
      if (req.file) {
        productPath = req.file.path;
      } else {
        next(new Error("product file reuired"));
      }

      let productobject = new product({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        skills: req.body.skills,
        product: productPath,
        ownerId: req.body.teamId ? req.body.teamId : req.id,
        ownerModel: req.body.teamId ? "teams" : req.role + "s",
      });

      productobject
        .save()
        .then((data) => {
          res.status(201).json({ data /*: "product created sucessfully"*/ });
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
    })
    .then((data) => {
      for (let item in req.body) {
        if ((data[item] = data["buyerId"])) {
          continue;
        }
        data[item] = req.body[item];
      }
      res.status(200).json({ data });
      return data.save();
    })

    .catch((error) => {
      next(error);
    });
};

//update buyer id (id product , buyerId )
module.exports.updateBuyerId = (req, res, next) => {
  product.findOne({ _id: req.params.id }).then((data) => {
    let object = {
      id: req.id,
      type: req.role == "company" ? "company" : req.role + "s",
    };

    data.buyer.push(object);
    res.status(200).json({ buyers: data.buyer });
  });
};

//delete one product
module.exports.deleteProduct = (req, res, next) => {
  product
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({
        data: "deleted",
      });
    })
    .catch((error) => next(error));
};
