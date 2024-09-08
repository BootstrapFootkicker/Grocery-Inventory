// supplierController.js

const pool = require("../config/db");

exports.getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    return result.rows;
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    throw new Error("Error fetching suppliers");
  }
};
exports.getSupplierIdByName = async (supplierName) => {
  try {
    const result = await pool.query(
      "SELECT supplierid FROM suppliers WHERE suppliername = $1",
      [supplierName],
    );
    if (result.rows.length > 0) {
      // The `?.` optional chaining operator safely accesses nested properties without explicit checks. If any reference in the
      // chain is `null` or `undefined`, the expression returns `undefined` instead of failing program.
      return result.rows[0]?.supplierid;
    } else {
      throw new Error("Supplier not found");
    }
  } catch (err) {
    console.error("Error retrieving supplier ID", err);
    throw err;
  }
};
