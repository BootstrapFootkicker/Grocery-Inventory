// routes/products.js
const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.products);
router.get("/:id", productsController.productDetails);
router.get("/categoryTest", productsController.categoryTest);

module.exports = router;
