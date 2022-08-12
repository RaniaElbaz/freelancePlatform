const mongoose = require("mongoose");

require("../models/category.model");
let Category = mongoose.model("categories");
let Skill = mongoose.model("skills");

module.exports.createCategory = (request, response, next) => {
  let object = new Category({
    name: request.body.name,
    image: request.body.image,
    skills: request.body.skills,
  });
  if (object.skills.length !== new Set([...object.skills]).size)
    throw Error("categories should be unique");
  Category.find({ name: request.body.name })
    .then((data) => {
      if (!data.length) {
        return object.save();
      } else throw Error("category name already token");
    })
    .then((data) => {
      Skill.find({ _id: { $in: data.skills } }).then((skills) => {
        skills.map((skill) => {
          skill.categories.push(data._id);
          skill.save();
        });
        response.status(201).json({ msg: "category created", data });
      });
    })
    .catch((error) => next(error));
};

module.exports.getAllCategories = (request, response, next) => {
  Category.find({})
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getCategoryById = (request, response, next) => {
  Category.findById({ _id: request.params.id })
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      if (data == null) next(new Error("category not found"));
      else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteCategory = (request, response, next) => {
  Skill.find({ categories: request.params.id }).then((skills) => {
    console.log(skills);
    skills.map((skill) => {
      skill.categories.splice(skill.categories.indexOf(request.params.id), 1);
      skill.save();
    });
  });
  Category.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("category not found"));
      } else response.status(200).json({ msg: "category deleted" });
    })
    .catch((error) => next(error));
};

module.exports.updateCategory = (request, response, next) => {
  Category.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("category not found"));
      for (let prop in request.body) {
        if (prop == "name") {
          if (request.body[prop] == data[prop]) {
            continue;
          }
          Category.findOne({ name: request.body.name }).then((repeatedData) => {
            if (repeatedData) {
              next(new Error("category name is already token"));
            } else {
              data[prop] = request.body[prop];
            }
          });
        } else if (
          [...request.body.skills].length !==
          new Set([...request.body.skills]).size
        )
          throw Error("skills should be unique");
        else data[prop] = request.body[prop] || data[prop];
      }

      return data.save().then((data) => {
        response.status(201).json({ msg: "Category updated", data });
      });
    })
    .catch((error) => {
      next(error);
    });
};
