const pool = require("../config/db");

exports.categoryForm = async (req, res) => {
  try {
    res.render("categoryForm", { title: "Add Product Category" });
  } catch (err) {
    console.error("Error rendering categoryForm:", err);
    res.status(500).send("Server Error");
  }
};

exports.addCategoryToDB = async (req, res) => {
  const { categoryName } = req.body;
  console.log("Received categoryName:", categoryName); // Add this line for debugging
  try {
    const result = await pool.query(
      "INSERT INTO categories (categoryname) VALUES ($1) RETURNING *",
      [categoryName],
    );
    console.log("Inserted category:", result.rows[0]); // Add this line for debugging
    res.redirect("/products");
  } catch (err) {
    console.error("Error adding category to database:", err);
    res.status(500).send("Server Error");
  }
};

// controllers/categoryController.js

exports.getAllCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return result.rows;
  } catch (err) {
    console.error("Error fetching categories from database:", err);
    throw err;
  }
};
