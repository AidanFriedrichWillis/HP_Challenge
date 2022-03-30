const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

/*
Main server page, where the program starts, 
This would contain a database connection also 

*/


app.use(cors());
app.use(express.json());
const urlRouter = require("./routes/url.routes");
app.use("/api", urlRouter);

//STARTING THE DATABASE COMMUNICATION
const uri = "mongodb://localhost:27017/URL_DB";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


app.listen(5000, () =>
  console.log(`Server has started.`)
);

module.exports = app;
