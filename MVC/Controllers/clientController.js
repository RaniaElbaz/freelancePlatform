let Client = require("../Models/clientSchema");
const bcrypt = require("bcrypt");


const getAllClients = (request, response, next) => {
  Client.find({}, { password: 0, isBlocked: 0 })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => { next(error) });
};


const getClientById = (request, response, next) => {
  Client.findOne({ _id: request.params.id }, { password: 0, isBlocked: 0 })
    .then(data => {
      if (!data) next(new Error("Client Not Found!"))
      response.status(201).json({ data });
    })
    .catch(error => { next(error) });
};

// const signUp = (req, res, next) => {
//   // Ensure the user not registered before & not Blocked
//   Client.find(
//     { email: req.body.email },
//     { _id: 0, email: 1, isBlocked: 1 }
//   )
//     .then(data => {
//       // console.log(data[0].email, "=> Data")
//       // console.log(data[0].isBlocked, "=> Data")
//       if (data[0]) {
//         if (data[0].email) throw new Error("This user is already registered!");
//         if (data[0].isBlocked == true) throw new Error("Access Denied");
//       }
//     }).then(newData => {
//       bcrypt.hash(req.body.password, 10, (error, hash) => {
//         // a) Created Object from the schema
//         let object = new Client({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           password: hash,
//           email: req.body.email
//         });
//         // b) insert the Object in the db => save data in the db
//         object.save()
//           .then(data => {
//             res.status(201).json({ data: "SignedUP" });
//           })
//           .catch(error => {
//             next(error);
//           });
//       })
//     })
//     .catch(error => next(error));

//   // res.json({ mes: "test" })
// };

const updateClient = (request, response, next) => {

  Client.findOne({ _id: request.params.id })
    .then(data => {
      // console.log(data);
      // console.log(request.body);
      for (let item in request.body) {
        // console.log(item);
        if (item == "location") {
          for (let nestedItem in request.body[item]) {
            // console.log(nestedItem); // ! Handling
            if (["postalCode", "state", "city", "address"].includes(nestedItem)) {
              data["location"][nestedItem] = request.body["location"][nestedItem];
            }
          }
        } else if (item == "analytics") {
          for (let nestedItem in request.body[item]) {
            // console.log(nestedItem, "from Analytics");// !handling
            if (["earnings", "jobs", "hours", "views"].includes(nestedItem)) {
              data["analytics"][nestedItem] = request.body['analytics'][nestedItem];
            }
          }
        }
        else
          data[item] = request.body[item]
      }
      return data.save();
    })
    .then((newData) => {
      response.status(201).json({ newData });
    })
    .catch(error => { next(error) });
};

const deleteClient = (request, response, next) => {
  Client.deleteOne({ _id: request.body.id })
    .then(data => {
      if (data.deletedCount === 0) next(new Error("Client Not Found!"))
      else
        response.status(200).json({ data: `Client ${request.params.id} Deleted` })
    })
    .catch(error => next(error));
};

const updateTestimonials = (request, response, next) => {
  Client.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("Client not found!");

      let TestimonialObject = {};
      console.log(TestimonialObject);
      for (let key in request.body) {
        TestimonialObject[key] = request.body[key];
        console.log(TestimonialObject);
      }
      data.testimonials.push(TestimonialObject);
      data.projects = request.body.project;
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

// const deleteTestimonials = () =>{} // ! handling

module.exports = {
  getAllClients,
  getClientById,
  // signUp,
  updateClient,
  deleteClient,
  updateTestimonials
};