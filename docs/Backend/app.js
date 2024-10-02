const express = require("express");
const app = express();
const apiLink = require("morgan");
const bodyParse = require("body-parser");

const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");
const usersRoutes = require("./api/routes/users");

app.use(apiLink("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/users", usersRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }

  next(); // Call next middleware in the chain
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
