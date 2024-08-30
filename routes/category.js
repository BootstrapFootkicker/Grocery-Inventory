const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", categoryController.categoryTest);

router.post("/", categoryController.addCategoryToDB);
module.exports = router; // Ensure this line is present
