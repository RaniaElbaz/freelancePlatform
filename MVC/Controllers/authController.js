const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("../Models/clientSchema");
// const Freelancer = require("./../Models/freelancerSchema");
// const Project = require("./../Models/projectSchema");
// const Admin = require("./../Models/adminSchema");

const mailgun = require("mailgun-js");
const DOMAIN = process.env.MailgunDOMAIN;
const api_key = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

/**************
 *    & SignUp
 * **************** */
let signUp = (req, res, next) => {
  // console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  Client.findOne({ email })
    .then(user => {
      if (user) throw new Error("User is already registered!");

      // Email Verification
      let token = jwt.sign({ email, firstName, lastName, password }, process.env.secret, { expiresIn: "10m" })
      const data = {
        from: 'geoAhmedHamdy1@gmail.com',
        to: email,
        subject: 'Email Verification Link',
        // text: 'Verify Email'
        html: `
          <h2>Account Verification</h2>
          <pre>
          Hello guy,
          
          Thank you for choosing Our Freelancing platform 😍
          Please confirm your email address by clicking the link below..

        <a href="http://localhost:${process.env.PORT}/authentication/activate/${token}">Verification</a>

          If you did not sign up, you can simply disregard this mail.

          Happy Emailing!
            Freelancico Team.
          </pre>
        `
      };
      mg.messages().send(data, function (error, body) {
        if (error) next(error);

        console.log(body);
        res.status(201).json({ data: "Email verification link has been sent, kindly activate your account" })
      });

    })
    .catch(error => next(error));
};


/**************
 *    & Activate Email (Email Verification)
 * **************** */
let activateAccount = (req, res, next) => {
  const { token } = req.body;
  try {
    if (!token) throw new Error("Something went Wrong!!");
    let decodedToken = jwt.verify(token, process.env.secret);

    const { firstName, lastName, email, password } = decodedToken;

    Client.findOne({ email })
      .then(user => {
        if (user) throw new Error("User is already registered!");

        bcrypt.hash(password, 10, (error, hash) => {
          let newClient = new Client({ firstName, lastName, email, password: hash });

          newClient.save()
            .then(data => {
              res.status(200).json({ data: "User SignedUP" });
            })
            .catch(error => next(`SignUp Activation Error: ${error}`));
        });
      })
      .catch(error => next(error));

  } catch (error) {
    next(error)
  }
};


/**************
 *    & Login
 * **************** */
const userLogin = (req, res, next) => {
  let Schema;

  // ! Ensure form the names the Collections 
  req.params.userType == "freelancer" ? Schema = Freelancer :
    req.params.userType == "team" ? Schema = Team :
      req.params.userType == "client" ? Schema = Client :
        req.params.userType == "admin" ? Schema = Admin :
          null;

  Schema.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) { // user not found
        let error = new Error("Incorrect Username or Password!")
        error.status = 401;
        throw error;
      }

      bcrypt.compare(req.body.password, user.password, (error, data) => {
        if (error) throw new Error("Incorrect Password");

        let token = jwt.sign({
          id: user._id,
          role: req.params.userType
        }, process.env.secret, { expiresIn: "1h" });
        res.status(200).json({ token, message: `${req.params.userType}Login` })
      })
    })
    .catch(error => next(error))
};


/**************
 *    & Forgot Password
 * **************** */
let forgotPassword = (req, res, next) => {
  const { email } = req.body;

  Client.findOne({ email }, { firstName: 1, email: 1, _id: 1 })
    .then(user => {
      if (!user) throw new Error("User is Not Exist!");

      let token = jwt.sign({ _id: user._id, email }, process.env.secret, { expiresIn: "10m" })
      const data = {
        from: 'geoAhmedHamdy1@gmail.com',
        to: email,
        subject: 'Password Resiting Link',
        // text: 'Verify Email'
        html: `
          <h2 style="color: red; font-size: 50px">Password Resiting</h2>
          <pre style="font-size: 30px;">
          Hello ${user.firstName},
          
          Please click on the given link to reset password..

        <a href="http://localhost:${process.env.PORT}/authentication/reset-password/${token}">Reset Password</a>

          If you did not forget password, Change your password now 👀.

          Happy Emailing!
            Freelancico Team.
          </pre>
        `
      };

      user.updateOne({ resetLink: token })
        .then(newData => {
          if (!newData) throw new Error("Reset Password Link error!");

          mg.messages().send(data, function (error, body) {
            if (error) next(error);

            res.status(200).json({ data: "Reset Password link has been sent to your Email, kindly check your mail and follow the instructions" })
            console.log(body);
          });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error))
}

/**************
 *    & Reset Password
 * **************** */
let resetPassword = (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  if (!resetLink) throw new Error("Authentication Error!!");
  let token = resetLink;

  try {
    let decodedToken = jwt.verify(token, process.env.secret);

    const { _id, email } = decodedToken;

    Client.findOne({ email, resetLink })
      .then(user => {
        if (!user) throw new Error("User with this token doesn't exist!");
        bcrypt.hash(newPassword, 10, (error, hash) => {
          user.updateOne({ password: hash, resetLink: "" })
            .then(data => {
              res.status(200).json({ data: "Password Resiting done successfully" })
            })
            .catch(error => next(error));
        })
      })
      .catch(error => next(error));
  } catch (error) {
    next(error)
  }

}



module.exports = {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword
}