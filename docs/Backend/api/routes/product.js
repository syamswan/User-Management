const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET method",
  });
});

router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };

  res.status(200).json({
    message: "POST method",
    createdProducts : product
  });
});

router.get("/:productId", (req, res, next) => {
  let id = req.params.productId;
  if (id == "special") {
    res.status(200).json({
      message: "id is special",
    });
  } else {
    res.status(200).json({
      message: "passed an id",
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted successfully",
  });
});

module.exports = router;
