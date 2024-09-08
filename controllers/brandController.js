const pool = require("../config/db");

exports.getAllBrands = async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT brand FROM products");
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching brands:", err);
    throw new Error("Error fetching brands");
  }
};
