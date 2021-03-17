// requires and port declaration
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const postRouter = require("./routes/post-routes");

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

// using the routes
app.use("/posts", postRouter);

// listening on port 3000...
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
