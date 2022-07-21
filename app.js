<<<<<<< HEAD
//require liberaries
const express = require("express")
const morgan = require("morgan")
const mongoose=require("mongoose")


//require Routes
const companyRouter=require("./Routes/companyRoute")
const productRouter=require("./Routes/productRoute")
const changePassword=require("./Routes/changePasswordRoute")



const server = express()
mongoose.connect("mongodb://localhost:27017/companyDB")
.then(()=>{
    console.log("database connected");
    server.listen(process.env.PORT||8080, () =>{
      console.log( "sever is listening "); }
    )
})
.catch(()=>{
    console.log("data error");
})

server.use(morgan("tiny"))

server.use(express.json())

//serve Routes
server.use(companyRouter)
// server.use(changePassword)
server.use(productRouter)



server.use((request, response) => {
  response.status(404).json({
      message: "Not Found"
  });
}); 

server.use((error, request, response, next) => {
  response.status(error.status||500).json({
      message: "Internal Error" + error
  });
})
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const teamRoutes = require("./MVC/routes/team.route");
const skillRoutes = require("./MVC/routes/skill.route");
const categoryRoutes = require("./MVC/routes/category.route");
const projectRoutes = require("./MVC/routes/project.route");
const adminRoute = require("./MVC/routes/admin.route");
const freelancerRoute = require("./MVC/routes/freelancer.route");
const reportRoute = require("./MVC/routes/report.route");
const testRoute = require("./MVC/routes/test.route");
const loginRoute = require("./MVC/routes/login.route");
const authRoute = require("./MVC/routes/auth.route");
const clintRoute = require("./MVC/routes/client.route");
const searchRoute = require("./MVC/routes/search.route");
const changePasswordRoute = require("./MVC/routes/changePassword.route");



const DB_URL = process.env.DB_URL;

const app = express();

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
    let port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listenning to port ${port}...`);
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

/****************** middleware *****************/
//1- MW url and method
app.use(morgan("dev")); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** routes *****************/

app.use("/public", express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //body parsing

app.use(loginRoute);
app.use(changePasswordRoute);
app.use(freelancerRoute);
app.use(adminRoute);
app.use(reportRoute);
app.use(testRoute);
app.use("/team", teamRoutes);
app.use("/skill", skillRoutes);
app.use("/category", categoryRoutes);
app.use("/project", projectRoutes);
app.use(authRoute);
app.use(clintRoute);
app.use(searchRoute);




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
>>>>>>> 09398dd3a5d873777acb3087014eb26a8860e882
