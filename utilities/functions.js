const bcrypt = require('bcrypt');

module.exports.unHashPassword = async (password, original) => {
    bcrypt.compare(password, original)
};

module.exports.checkDuplicated = (value) => {
  const duplicated = value.filter(
    (item, index) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

module.exports.hashPassword = (request, response, next) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt
      .hash(request.body.password, salt)
      .then(function (hash) {
        request.body.password = hash;
        next();
      })
      .catch((error) => next(error));
  });
};