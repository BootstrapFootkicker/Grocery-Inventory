const express = require("express");
const brandController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");
const supplierController = require("../controllers/supplierController");
const pool = require("../config/db");

// Controller to handle fetching and rendering all products
exports.products = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    const categories = await categoryController.getAllCategories();
    res.render("products", {
      title: "Products",
      data: products.rows,
      categories: categories,
    });
  } catch (err) {
    console.error("Error in products function:", err);
    res.status(500).send("Server Error in products function");
  }
};

exports.productForm = async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    const suppliers = await supplierController.getAllSuppliers();
    const brands = await brandController.getAllBrands();
    res.render("productForm", {
      title: "Add Product",
      categories: categories,
      suppliers: suppliers,
      brands: brands,
    });
  } catch (err) {
    console.error("Error in productForm function:", err);
    res.status(500).send("Server Error in productForm function");
  }
};

exports.productDetails = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT p.*, s.suppliername
       FROM products p
       JOIN suppliers s ON p.supplierid = s.supplierid
       WHERE p.productid = $1`,
      [productId],
    );

    if (result.rows.length > 0) {
      res.render("item", { title: "Product Details", product: result.rows[0] });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error("Error in productDetails function:", err);
    res.status(500).send("Server Error in productDetails function");
  }
};

exports.addProductToDB = async (req, res) => {
  console.log("addProductToDB function called");

  const {
    productname,
    price,
    category,
    supplierName,
    brand,
    sizeweight,
    packagingtype,
    description,
  } = req.body;

  try {
    // Fetch category ID and supplier ID
    const categoryid = category;
    const supplierid =
      await supplierController.getSupplierIdByName(supplierName);

    //Check if category ID and supplier ID are found
    if (!categoryid) {
      console.error("Category not found in addProductToDB function");
      return res
        .status(404)
        .send("Category not found in addProductToDB function");
    }

    if (!supplierid) {
      console.error("Supplier not found in addProductToDB function");
      return res
        .status(404)
        .send("Supplier not found in addProductToDB function");
    }

    console.log("Category ID:", categoryid);
    console.log("Supplier ID:", supplierid);

    // Insert the product into the database
    const result = await pool.query(
      "INSERT INTO products (productname, price, categoryid, supplierid, brand, sizeweight, packagingtype,description) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        productname,
        price,
        categoryid,
        supplierid,
        brand,
        sizeweight,
        packagingtype,
        description,
      ],
    );

    console.log("Inserted product:", result.rows[0]);
    res.redirect("/products");
  } catch (err) {
    console.error("Error in addProductToDB function:", err);
    res.status(500).send("Server Error in addProductToDB function");
  }
};
