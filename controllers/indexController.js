const express = require("express");

// controllers/indexController.js
const pool = require('../config/db');

exports.index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catagories');
    res.render('index', { title: 'Home', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


// controllers/indexController.js
// exports.index = (req, res) => {
//   res.render('index', { title: 'Home' });
// };
// controllers/indexController.js
exports.testConnection = async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('Database connection successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
};