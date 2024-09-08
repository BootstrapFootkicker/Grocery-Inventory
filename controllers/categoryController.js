const pool = require("../config/db");

// Render the form to add a new product category
exports.categoryForm = async (req, res) => {
  try {
    res.render("categoryForm", { title: "Add Product Category" });
  } catch (err) {
    console.error("Error in categoryForm:", err);
    res.status(500).send("Server Error");
  }
};

// Get the category ID by category name
// controllers/categoryController.js
exports.getCategoryIdByName = async (categoryName) => {
  try {
    const result = await pool.query(
      "SELECT categoryid FROM categories WHERE categoryname = $1",
      [categoryName],
    );
    if (result.rows.length > 0) {
      console.log("Category ID found:", result.rows[0].categoryid);
      return result.rows[0].categoryid;
    } else {
      console.log("Category not found:", categoryName);
      return null;
    }
  } catch (err) {
    console.error("Error in getCategoryIdByName function:", err);
    throw err;
  }
};

// Add a new category to the database
exports.addCategoryToDB = async (req, res) => {
  const { categoryName } = req.body;
  console.log("Received categoryName:", categoryName);
  try {
    const result = await pool.query(
      "INSERT INTO categories (categoryname) VALUES ($1) RETURNING *",
      [categoryName],
    );
    console.log("Inserted category:", result.rows[0]);
    res.redirect("/products");
  } catch (err) {
    console.error("Error in addCategoryToDB:", err);
    res.status(500).send("Server Error");
  }
};

exports.removeCategoryFromDB = async (req, res) => {
  const { categoryName } = req.params;
  console.log("Received categoryName:", categoryName);

  try {
    const categoryId = await exports.getCategoryIdByName(categoryName);
    console.log("Category ID:", categoryId);

    if (!categoryId) {
      console.error("Error in removeCategoryFromDB: Category not found");
      return res.status(404).send("Category not found");
    }

    const miscCategoryId = await exports.getCategoryIdByName("MISC");
    console.log("MISC categoryId:", miscCategoryId);

    if (!miscCategoryId) {
      console.error("Error in removeCategoryFromDB: MISC category not found");
      return res.status(404).send("MISC category not found");
    }

    const updateResult = await pool.query(
      "UPDATE products SET categoryid = $1 WHERE categoryid = $2",
      [miscCategoryId, categoryId],
    );
    console.log("Updated products:", updateResult.rowCount);

    const deleteResult = await pool.query(
      "DELETE FROM categories WHERE categoryid = $1",
      [categoryId],
    );
    console.log("Deleted category:", deleteResult.rowCount);

    // Send success response instead of redirecting
    res.status(200).send("Category deleted successfully");
  } catch (err) {
    console.error("Error in removeCategoryFromDB:", err);
    res.status(500).send("Server Error");
  }
};

// Get all categories from the database
exports.getAllCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return result.rows;
  } catch (err) {
    console.error("Error in getAllCategories:", err);
    throw err;
  }
};

// Fetch and render products by category
exports.categoryProducts = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const categoryId = await exports.getCategoryIdByName(categoryName);

    if (!categoryId) {
      return res.status(404).send(`${categoryName} category not found`);
    }

    const products = await pool.query(
      "SELECT * FROM products WHERE categoryid = $1",
      [categoryId],
    );

    const categories = await exports.getAllCategories();

    res.render("products", {
      title: `${categoryName} Products`,
      data: products.rows,
      categories: categories,
    });
  } catch (err) {
    console.error("Error in categoryProducts:", err);
    res.status(500).send("Server Error");
  }
};
