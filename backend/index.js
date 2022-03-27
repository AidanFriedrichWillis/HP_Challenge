const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// const uri = "mongodb://localhost:27017/users";
// mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

const urlRouter = require("./routes/url.routes");
app.use("/api", urlRouter);


app.listen(5000, () =>
  console.log(`Server has started.`)
);
