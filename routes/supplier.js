const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const supplierController = require('../controllers/supplier');

router.get('/', supplierController.index);
router.get('/create', supplierController.create);
router.post('/store', supplierController.store);
router.get('/:id/edit', supplierController.edit);
router.put('/:id', supplierController.update);
router.delete('/:id', supplierController.delete);

module.exports = router;