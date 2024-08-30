const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.products);
router.get("/:id", productsController.productDetails);
router.get("/filter/:categoryName", productsController.categoryProducts);

module.exports = router;
