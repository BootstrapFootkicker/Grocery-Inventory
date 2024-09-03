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

// Create Tables
const createDatabaseTables = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const dropTablesQuery = `DROP TABLE IF EXISTS products, categories, suppliers`;
    await client.query(dropTablesQuery);
    // Create categories table
    const createCategoriesTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        categoryid SERIAL PRIMARY KEY,
        categoryname VARCHAR(255) NOT NULL
      )`;
    await client.query(createCategoriesTableQuery);

    // Create suppliers table
    const createSuppliersTableQuery = `
      CREATE TABLE IF NOT EXISTS suppliers (
        supplierid SERIAL PRIMARY KEY,
        suppliername VARCHAR(255) NOT NULL,
        contactinformation VARCHAR(255),
        leadtime VARCHAR(255),
        minorderquantity INT
      )`;
    await client.query(createSuppliersTableQuery);

    // Create products table
    const createProductsTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        productid SERIAL PRIMARY KEY,
        productname VARCHAR(255) NOT NULL,
        sku VARCHAR(255) NOT NULL,
        categoryid INT REFERENCES categories(categoryid),
        brand VARCHAR(255),
        description TEXT,
        sizeweight VARCHAR(255),
        packagingtype VARCHAR(255),
        supplierid INT REFERENCES suppliers(supplierid),
        price DECIMAL(10, 2)
      )`;
    await client.query(createProductsTableQuery);

    await client.query("COMMIT");
    console.log("Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
};

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
      INSERT INTO categories (categoryname) VALUES
      ('Fruits'),
      ('Vegetables'),
        ('MISC')`;
    await client.query(insertCategoriesQuery);

    // Insert sample data into suppliers
    const insertSuppliersQuery = `
      INSERT INTO suppliers (suppliername, contactinformation, leadtime, minorderquantity) VALUES
      ('Supplier A', '123-456-7890', '2 days', 100),
      ('Supplier B', '987-654-3210', '3 days', 200)`;
    await client.query(insertSuppliersQuery);

    // Insert sample data into products
    const insertProductsQuery = `
      INSERT INTO products (categoryid,supplierid,productname, sku, brand, description, sizeweight, packagingtype, price) VALUES
      (1,1,'Apple', 'SKU001',  'Brand A', 'Fresh red apple', '1 lb', 'Bag',  1.99),
      (1,1,'Banana', 'SKU002',  'Brand B', 'Ripe yellow banana', '1 lb', 'Bunch',  0.99),
      (2,2,'Carrot', 'SKU003',  'Brand C', 'Organic carrot', '1 lb', 'Bag',  1.49),
      (1,2,'Tomato', 'SKU004',  'Juicy red tomato', 'Brand D', '1 lb', 'Box',  2.49)`;
    await client.query(insertProductsQuery);

    await client.query("COMMIT");
    console.log("Database populated successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error populating database", err.message, err.stack);
  } finally {
    client.release();
  }
};

// Initializes the database
const initDB = async () => {
  try {
    await createDatabaseTables();
    await populateDB();
  } catch (err) {
    console.error("Error initializing database", err);
  }
};

initDB().catch((err) => console.error("Unexpected error", err));

module.exports = pool;
