const express = require("express");
const app = express();

//in order for you to access this via a web browser, you will been to create routes
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.listen(3000, () => {
  console.log(`Node is running on port 3000`);
});
