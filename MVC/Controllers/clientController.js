let Clint = require("../Models/clientSchema");


module.exports.getAllClients = (request, response, next) => {
  Clint.find({}, { password: 0 })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => { next(error) });
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};


module.exports.getClientById = (request, response, next) => {
  Clint.findOne({ _id: request.params.id }, { password: 0 })
    .then(data => {
      if (!data) next(new Error("Client Not Found!"))
      response.status(201).json({ data });
    })
    .catch(error => { next(error) });
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};

module.exports.createClient = (request, response, next) => {
  // a) Created Object from the schema
  let object = new Clint({
    // _id: request.body.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    picture: request.body.picture,
    // accountType: request.body.accountType,
    location: {
      street: request.body.location.street,
      buildingNumber: request.body.location.buildingNumber,
      city: request.body.location.city,
      country: request.body.location.country,
      postalCode: request.body.location.postalCode
    },
    phoneNumber: request.body.phoneNumber,
    analytics: request.body.analytics,
    wallet: request.body.wallet,
    description: request.body.description,
    isVerified: request.body.isVerified,
  });
  // b) insert the Object in the db => save data in the db
  object.save()
    .then(data => {
      response.status(201).json({ data: "Added" });
    })
    .catch(error => {
      next(error);
    });
  // response.status(200).json({ data: "Created Ya Man🥰" });
};

module.exports.updateClient = (request, response, next) => {

  Clint.findOne({ _id: request.params.id })
    .then(data => {
      // console.log(data);
      // console.log(request.body);
      for (let item in request.body) {
        // console.log(item);
        if (item == "location") {
          for (let nestedItem in request.body[item]) {
            // console.log(nestedItem);
            if (["street", "buildingNumber", "city", "country", "postalCode"].includes(nestedItem)) {
              data["location"][nestedItem] = request.body["location"][nestedItem];
            }
          }
        } else if (item == "analytics") {
          for (let nestedItem in request.body[item]) {
            // console.log(nestedItem, "from Analytics");
            if (["followers", "following", "viewers"].includes(nestedItem)) {
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
  // response.status(201).json({ data: "Updated Ya Man🥰" });
};

module.exports.deleteClient = (request, response, next) => {

  Child.deleteOne({ _id: request.body.id })
    .then(data => {
      if (data.deletedCount === 0) next(new Error("Client Not Found!"))
      else
        response.status(200).json({ data: `Client ${request.params.id} Deleted` })
    })
    .catch(error => next(error));
  // response.status(201).json({ data: "Deleted Ya Man🥰" });
};

