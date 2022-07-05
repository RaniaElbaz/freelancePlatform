const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const teamRoutes = require("./routes/team.Route");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/freelancingPlatform")
  .then(() => {
    console.log("DB Connected");
    let port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listenning to port ${port}...`);
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

app.use(morgan(":method :url"));
app.use(cors());
app.use(express.json());

// endpoints
app.use("/team", teamRoutes);

app.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

app.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: "Error" + error });
});
