const express = require("express");
const mongoose = require("mongoose");
const app = express();

//in order for you to access this via a web browser, you will been to create routes
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

// this is when we needed to install nodemon because we cannot access the /blog
app.get("/blog", (req, res) => {
  res.send("Hello blog, My name is Sendoh");
});

// product route
app.post("/products", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// database connection
mongoose
  .connect(
    "mongodb+srv://admin:hcrootadmin@hctestapi.rvwa7xj.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
