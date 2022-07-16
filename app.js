require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

/************ routes */
const adminRoute = require("./MVC/routes/admin.route");
const freelancerRoute = require("./MVC/routes/freelancer.route");
const reportRoute = require("./MVC/routes/report.route");
const testRoute = require("./MVC/routes/test.route");
const loginRoute = require("./MVC/routes/login.route");
const changePasswordRoute = require("./MVC/routes/changePassword.route");

/************ */
const DB_URL = process.env.DB_URL;

//create server obejct
const app = express();
mongoose.connect(DB_URL)
    .then(()=>{
        console.log("DB Connected.");
        //listen to port number
        app.listen(process.env.PORT||8080,()=>{
            console.log("Listening on localhost:8080");
        });            
    })
    .catch((error)=>console.log("Db Connection Error " + error));

/****************** middleware *****************/
//1- MW url and method                                              
app.use(morgan('dev')); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** routes *****************/
app.use(express.json());//body parsing

app.use(loginRoute);
app.use(changePasswordRoute);
app.use(freelancerRoute);
app.use(adminRoute);
app.use(reportRoute);
app.use(testRoute);

//3- Not Found MW
app.use((request,response)=>{
    console.log('Not Found MW');
    response.status(404).json({message:"Not Found"});
});

//4- Error MW
app.use((error,request,response,next)=>{
    console.log('Error MW');
    let errorStatus = error.status || 500;
    response.status(errorStatus).json({message:"Internal Error:\n" + error});
})