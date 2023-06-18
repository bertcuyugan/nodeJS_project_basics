const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// this is when we needed to install nodemon because we cannot access the /blog
app.get("/blog", (req, res) => {
  res.send("Hello blog, My name is Sendoh");
});

// route - this is a sample route (in order for you to access this via a web browser, create a route)
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

// route - fetching ALL product
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route - fetching single or one product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route - adding product items
app.post("/products", async (req, res) => {
  //   console.log(req.body);
  //   res.send(req.body);
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route - update or edit data
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we cannot find any product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route - remove/delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
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
