let Clint = require("./../Models/clintSchema");


module.exports.getAllClint = (request, response, next) => {
  Clint.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch();
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};

module.exports.getClintById = (request, response, next) => {
  Clint.findOne({ _id: request.params.id })
    .then(data => {
      response.status(201).json({ data });
    })
    .catch(error => { next(error) });
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};

module.exports.createClint = (request, response, next) => {
  // Created Object from the schema
  let object = new Clint({
    // _id: request.body.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    accountType: request.body.accountType,
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
  // insert the Object in the db
  object.save()
    .then(data => {
      response.status(201).json({ data: "Added" });
    })
    .catch(error => {
      next(error);
    });
  // response.status(200).json({ data: "Created Ya Man🥰" });
};

module.exports.updateClint = (request, response, next) => {

  Clint.findOne({ _id: request.body.id })
    .then(data => {
      // console.log(data);
      console.log(request.body);
      // for (let item in request.body) {
      //   if (location.street == "city" || item == "street" || item == "building") {
      //     data["address"][item] = request.body[item]
      //   } else {
      //     data[item] = request.body[item]
      //   }
      // }
      return data.save();
    })
    .then((newData) => {
      response.status(201).json({ newData });
    })
    .catch(error => { next(error) });
  // response.status(201).json({ data: "Updated Ya Man🥰" });
};

module.exports.deleteClint = (request, response, next) => {

  Child.deleteOne({ _id: request.body.id })
    .then(data => {
      response.status(200).json({ data: "Deleted" })
    })
    .catch(error => next(error));
  // response.status(200).json({ data: "Deleted" + request.params.id });
  response.status(201).json({ data: "Deleted Ya Man🥰" });
};

