const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.get("/", productController.productForm);

router.post("/", productController.addProductToDB);

module.exports = router; // Ensure this line is present