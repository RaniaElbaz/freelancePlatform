const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // let decodedToken = null;
  try {
    let token = req.get("Authorization")

    if (token) {// token !== undefined
      token.split(" ")[1]; // encoded (encrypted) token fetch
      let decodedToken = jwt.verify(token, process.env.secret) // decoded token 

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