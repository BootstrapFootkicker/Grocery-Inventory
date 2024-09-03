const express = require("express");
const categoryController = require("../controllers/categoryController");
const pool = require("../config/db");

// Controller to handle fetching and rendering all products
exports.products = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await pool.query("SELECT * FROM products");

    // Fetch all categories from the database
    const categories = await categoryController.getAllCategories();

    // Render the products page with the fetched products and categories
    res.render("products", {
      title: "Products",
      data: products.rows,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller to handle fetching and rendering product details by product ID
exports.productDetails = async (req, res) => {
  const productId = req.params.id;

  try {
    // Fetch product details and supplier name by product ID
    const result = await pool.query(
      // SQL query to select all columns from the products table (aliased as p) and the suppliername column from the suppliers table (aliased as s)
      `SELECT p.*, s.suppliername
       FROM products p
       JOIN suppliers s ON p.supplierid = s.supplierid
       WHERE p.productid = $1`,
      [productId],
    );

    // If product is found, render the item page with product details
    if (result.rows.length > 0) {
      res.render("item", { title: "Product Details", product: result.rows[0] });
    } else {
      // If product is not found, send a 404 response
      res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
