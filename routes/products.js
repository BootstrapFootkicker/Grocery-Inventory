const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

/* GET users listing. */
router.get("/", productsController.products);

module.exports = router;
