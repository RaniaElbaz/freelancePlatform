const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const clintRoute = require("./MVC/Routes/clientRoute");



// * 1)  Create Server
const server = express();

// todo: Connect to the DB
mongoose.connect(process.env.DB_URL)//"mongodb://localhost:27017/FPDB")
  .then(() => {
    console.log("DB Connected");

    // * 2 ) Listen to server and port number
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
    });

  })
  .catch(error => { console.log(error) });

// * 3 ) Create Middleware & Endpoints
// 3 a) CORS MW
// CORS => Cross-Origin Resource Sharing
// It is a package allow the outside domains to connect with node server..
// CORS must be used before the Rout.
server.use(cors(
  { origin: '*' }
));

// 3 b) Morgan MW to log the url & method
server.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    // tokens.res(req, res, 'content-length'), '-',
    // tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));


// ^  EndPoints == Routes ==>
// communication channel to grab data
server.use(express.json()); // parse matched json http request bodies =>> express.json() must be before routes
server.use(clintRoute);




// 3 c) Not Found MW
server.use('/', (request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});


// 3 d) Error Handling MW
server.use((error, request, response, next) => {
  response.status(500).json({ message: "Internal Error" + error });
});


