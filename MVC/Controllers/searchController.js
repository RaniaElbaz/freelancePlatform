
const router = require("../Routes/clientRoute");
let Client = require("./../Models/clientSchema");
// let Team = require("./../Models/teamSchema");
// let Freelancer = require("./../Models/freelancerSchema");
// let Project = require("./../Models/projectSchema");


module.exports.getJob = (req, res, next) => {
  // console.log(req.query.searchKey, "This is the QuerySearch");
  let regex = new RegExp(req.query.searchKey, "i")
    , query = { name: regex };

  Project.find(query, function (err, data) {
    if (err) {
      res.json(err);
    }
    res.status(200).json(data);
  });
  res.status(200).json({ data: "Aho Ya Man🥰" });
}

module.exports.getProfile = (req, res, next) => {

  let Schema;
  // console.log(req.query.searchKey, "==> QuerySearch");
  // console.log(req.params.userType, "==> userType");

  // ! Ensure form the names the Collections 
  req.params.userType == "freelancer" ? Schema = Freelancer :
    req.params.userType == "team" ? Schema = Team :
      req.params.userType == "client" ? Schema = Client : null;


  let regex = new RegExp(req.query.searchKey, "i")
    , query = { $or: [{ firstName: regex }, { lastName: regex }] };

  Schema.find(query, function (err, data) {
    if (err) {
      res.json(err);
    }
    res.status(200).json(data);
  });

  // res.status(200).json({ data: "Aho Ya Man🥰" });
}

