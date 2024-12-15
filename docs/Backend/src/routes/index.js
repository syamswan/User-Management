const express = require("express");

const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes")

const router = express.Router();

router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoutes);

module.exports = router;
