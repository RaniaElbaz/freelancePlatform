const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("Authorization"); // encoded (encrypted) token fetch

    if (token) {// token !== undefined
      let sToken = token.split(" ")[1];
      let decodedToken = jwt.verify(sToken, process.env.secret) // decoded token 

      req.role = decodedToken.role;
      if (req.id) {
        req.id = decodedToken.id;
      }
    } else {
      next();
    }
  } catch (error) {
    error.msg = 'Not Authorized';
    error.status = 403; // authentication error
    next(error);
  }

  // console.log(token);
  // console.log(decodedToken);
  next();
}