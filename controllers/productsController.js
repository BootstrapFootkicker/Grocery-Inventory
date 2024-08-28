const express = require("express");

const pool = require("../config/db");

exports.products = async (req, res) => {
  const categoryid = req.query.categoryid;
  let query = "SELECT * FROM products";
  let params = [];

  if (categoryid) {
    query += " WHERE categoryid = $1";
  }

  if (categoryid === "fruit") {
    params.push(1);
  } else if (categoryid === "vegetables") {
    params.push(2);
  }
  console.log("Executing query:", query, "with parameters:", params);

  try {
    const result = await pool.query(query, params);
    res.render("products", {
      title: categoryid || "Products",
      data: result.rows,
      action: "addProductCategory()"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
// controllers/productsController.js

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
    console.error(err);
    res.status(500).send("Server Error");
  }
};


// controllers/productsController.js
exports.categoryTest = async (req, res) => {
  try {
    res.render('categoryForm', { title: 'Add Product Category' });
  } catch (err) {
    console.error('Error rendering categoryForm:', err);
    res.status(500).send('Server Error');
  }
};