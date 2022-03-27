const express = require("express");
const cors = require("cors");
const app = express();

/*
Main server page, where the program starts, 
This would contain a database connection also 

*/


app.use(cors());
app.use(express.json());
const urlRouter = require("./routes/url.routes");
app.use("/api", urlRouter);


app.listen(5000, () =>
  console.log(`Server has started.`)
);

module.exports = app;
