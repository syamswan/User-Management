const express = require("express");

const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
