const jwt = require("jsonwebtoken");

module.exports = (request, res, next) => {
  // let decodedToken = null;
  try {
    let token = request.get("Authorization");

    if (token) {
      // token !== undefined
      token.split(" ")[1]; // encoded (encrypted) token fetch
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY); // decoded token

      request.role = decodedToken.role;
      request.id = decodedToekn.id;
    } else {
      next();
    }
  } catch (error) {
    error.msg = "Not Authorized";
    error.status = 403; // authentication error
    next(error);
  }
};
