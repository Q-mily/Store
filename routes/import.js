const express = require('express');
const router = express.Router();
const ImportController = require('../controllers/import');
const importbillController = require('../controllers/importbill');
router.get('/create', ImportController.create);
router.get('/', ImportController.index);

router.get('/:id/invoice',importbillController.index);
router.post('/store', ImportController.Store);
module.exports = router;