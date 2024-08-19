const express = require("express");

const pool = require("../config/db");

exports.products = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.render("products", { title: "Products", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
