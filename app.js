require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const paypal = require("paypal-rest-sdk");

const paymentRoute = require("./MVC/routes/payment.route");
const companyRouter = require("./MVC/routes/company.route");
const productRouter = require("./MVC/routes/product.route");
const teamRoutes = require("./MVC/routes/team.route");
const skillRoutes = require("./MVC/routes/skill.route");
const categoryRoutes = require("./MVC/routes/category.route");
const projectRoutes = require("./MVC/routes/project.route");
const adminRoute = require("./MVC/routes/admin.route");
const freelancerRoute = require("./MVC/routes/freelancer.route");
const reportRoute = require("./MVC/routes/report.route");
const testRoute = require("./MVC/routes/test.route");
const authRoute = require("./MVC/routes/auth.route");
const clintRoute = require("./MVC/routes/client.route");
const searchRoute = require("./MVC/routes/search.route");
const changePasswordRoute = require("./MVC/routes/changePassword.route");
// const loginRoute = require("./MVC/routes/login.route");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
    let port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listenning to port ${port}...`);
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

/****** middleware *******/
//1- MW url and method
app.use(morgan("dev")); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** routes *****************/
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //body parsing

// app.use(loginRoute);
app.use(authRoute);
app.use(changePasswordRoute);

app.use(paymentRoute);

app.use(freelancerRoute);
app.use(adminRoute);
app.use(reportRoute);
app.use(testRoute);
app.use("/team", teamRoutes);
app.use("/skill", skillRoutes);
app.use("/category", categoryRoutes);
app.use("/project", projectRoutes);
app.use(clintRoute);
app.use(searchRoute);
app.use(companyRouter);
app.use(productRouter);

//3- Not Found MW
app.use((request, response) => {
  console.log("Not Found MW");
  response.status(404).json({ message: "Not Found" });
});

//4- Error MW
app.use((error, request, response, next) => {
  console.log("Error MW");
  let errorStatus = error.status || 500;
  response.status(errorStatus).json({ message: "Internal Error:\n" + error });
});
