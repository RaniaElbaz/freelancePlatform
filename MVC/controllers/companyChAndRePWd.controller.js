const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let company = mongoose.model("company");

module.exports.changePassword = (request, response, next) => {
  //already logged in
  company.findOne({ _id: request.id }, { password: 1 })
    .then((data) => {
      if (!data) {
        //user not found
        let error = new Error("username or password incorrect!");
        error.status = 401;
        next(error);
      } else {
        //user found
        bcrypt.compare(request.body.oldPassword,data.password,
          function (error, result) {
            if (error) next(error);
            if (!result) {
              next(new Error("username or password incorrect"));
            } else {
              // correct password
              bcrypt.compare(request.body.password,data.password,   //comparesync
                function (error, result) {
                  if (error) next(error);
                  if (result) {
                    next(
                      new Error("new password cant be the same old password")
                    );
                  } else {
                    data.password = bcrypt.hashSync(request.body.password, 10);
                    data.save();
                    response.status(201).json({ data: "password changed" });
                  }
                }
              );
            }
          }
        );
      }
    })
    .catch((error) => next(error));
};



module.exports.resetPassword = (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  if (!resetLink) next(new Error("Authentication Error!!"));
  let token = resetLink;

  try {
    // let decodedToken = jwt.verify(token, process.env.secret);
    // const { _id, email } = decodedToken;

    company.findOne({ resetLink }, { password: 1 })
      .then(user => {
        if (!user) next(new Error("User with this token doesn't exist!"));

        // bcrypt.compareSync(plainText, hashedText) ==> return true or false;
        let isMatch = bcrypt.compareSync(newPassword, user.password);


        if (isMatch) {
          // isMatch ==> the two password is the same..
          next(Error("This is the Old Password, Enter new One"));
        } else {
          bcrypt.hash(newPassword, 10, (error, hash) => {
            user.updateOne({ password: hash, resetLink: "" })
              .then(data => {
                res.status(200).json({ data: "Password Resiting done successfully" })
              })
              .catch(error => next(error));
          })
        }

      })
      .catch(error => next(error));
  } catch (error) {
    next(error)
  }

}
