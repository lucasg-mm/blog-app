// requires and port declaration
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3000;

// declaring the express app
const app = express();

// using the body-parser
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected successfully to the database!");
    // console.log(res);
  })
  .catch((err) => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });

// endpoints
app.route("/").get((req, res) => {
  res.send("<h1>Hello!</h1>");
});

// listening on port 3000...
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
