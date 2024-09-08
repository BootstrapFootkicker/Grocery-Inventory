const express = require("express");
const supplierController = require("../controllers/supplierController");

const router = express.Router();

router.get("/", supplierController.getAllSuppliers);

module.exports = router;
