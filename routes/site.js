const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const siteController = require('../controllers/site');

router.get('/', siteController.index)

module.exports = router;