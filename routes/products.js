// routes/products.js
const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.products);
router.get("/:id", productsController.productDetails);

module.exports = router;
