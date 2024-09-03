const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// Add this route to the existing file
router.get("/:categoryName", categoryController.categoryProducts);
router.delete("/:categoryName", categoryController.removeCategoryFromDB);

module.exports = router;
