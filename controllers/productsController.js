const express = require("express");
const categoryController = require("../controllers/categoryController");
const pool = require("../config/db");

exports.products = async (req, res) => {
  const products = await pool.query("SELECT * FROM products");

  try {
    const categories = await categoryController.getAllCategories();
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

exports.fruitProducts = async (req, res) => {
  const products = await pool.query(
    "SELECT * FROM products WHERE categoryid = $1",
    [1],
  );

  try {
    const categories = await categoryController.getAllCategories();
    res.render("products", {
      title: "Fruit Products",
      data: products.rows,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.vegetableProducts = async (req, res) => {
  const products = await pool.query(
    "SELECT * FROM products WHERE categoryid = $1",
    [2],
  );

  try {
    const categories = await categoryController.getAllCategories();
    res.render("products", {
      title: "Vegetable Products",
      data: products.rows,
      categories: categories,
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
