const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

/* GET users listing. */
router.get("/", productsController.products);

router.get("/", productsController.productsByCategory);
module.exports = router;
