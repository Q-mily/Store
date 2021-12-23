const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const jwt = require('jsonwebtoken');

const invoiceController = require('../controllers/invoice');
router.get('/pos', orderController.pos);
router.get('/', orderController.index);
router.get('/:id/invoice', invoiceController.index);

router.post('/:id/delete', orderController.deleteOrder);
router.post('/orderandpay', orderController.OrderAndPay);
router.post('/order', orderController.Order);
module.exports = router;