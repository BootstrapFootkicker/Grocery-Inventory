// config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Populate the database with sample data
const populateDB = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Clear existing data
    await client.query("DELETE FROM products");
    await client.query("DELETE FROM categories");
    await client.query("DELETE FROM suppliers");

    // Insert sample data into categories
    const insertCategoriesQuery = `
      INSERT INTO categories (categoryid, categoryname) VALUES
      (1, 'Fruits'),
      (2, 'Vegetables')`;
    await client.query(insertCategoriesQuery);

    // Insert sample data into suppliers
    const insertSuppliersQuery = `
      INSERT INTO suppliers (supplierid, suppliername) VALUES
      (1, 'Supplier A'),
      (2, 'Supplier B')`;
    await client.query(insertSuppliersQuery);

    // Insert sample data into products
    const insertProductsQuery = `
      INSERT INTO products (productid, productname, price, description, supplierid) VALUES
      (1, 'Apple', 0.5, 'Fresh red apple', 1),
      (2, 'Banana', 0.3, 'Ripe yellow banana', 1),
      (3, 'Carrot', 0.2, 'Organic carrot', 2),
      (4, 'Tomato', 0.4, 'Juicy red tomato', 2)`;
    await client.query(insertProductsQuery);

    await client.query("COMMIT");
    console.log("Database populated successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error populating database", err);
  } finally {
    client.release();
  }
};

populateDB().catch((err) => console.error("Unexpected error", err));

module.exports = pool;
