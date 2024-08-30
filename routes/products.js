const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.products);
router.get("/:id", productsController.productDetails);
router.get("/filter/Fruits", productsController.fruitProducts); // Corrected path
router.get("/filter/Vegetables", productsController.vegetableProducts);
module.exports = router;
