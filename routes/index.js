const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router.get('/', indexController.index);
router.get('/test', indexController.testConnection);

module.exports = router;
