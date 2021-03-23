// requires and port declaration
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/post-routes");
const userRouter = require("./routes/user-routes")

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
app.use("/users", userRouter);

// listening on the port specified in the .env file
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
