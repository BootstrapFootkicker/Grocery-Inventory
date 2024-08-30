const pool = require("../config/db");

// Render the form to add a new product category
exports.categoryForm = async (req, res) => {
  try {
    res.render("categoryForm", { title: "Add Product Category" });
  } catch (err) {
    console.error("Error rendering categoryForm:", err);
    res.status(500).send("Server Error");
  }
};

// Get the category ID by category name
exports.getCategoryIdByName = async (categoryName) => {
  try {
    const result = await pool.query(
      "SELECT categoryid FROM categories WHERE categoryname = $1",
      [categoryName],
    );
    // Use optional chaining to safely access the categoryid property of the first row in the result set.
    // If the result set is empty, return null instead of causing an error.
    return result.rows[0]?.categoryid || null;
  } catch (err) {
    console.error("Error fetching category ID from database:", err);
    throw err;
  }
};

// Add a new category to the database
exports.addCategoryToDB = async (req, res) => {
  const { categoryName } = req.body;
  console.log("Received categoryName:", categoryName); // Debugging: Log received category name
  try {
    const result = await pool.query(
      "INSERT INTO categories (categoryname) VALUES ($1) RETURNING *",
      [categoryName],
    );
    console.log("Inserted category:", result.rows[0]); // Debugging: Log inserted category
    res.redirect("/products");
  } catch (err) {
    console.error("Error adding category to database:", err);
    res.status(500).send("Server Error");
  }
};

// Get all categories from the database
exports.getAllCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return result.rows;
  } catch (err) {
    console.error("Error fetching categories from database:", err);
    throw err;
  }
};
