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
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
