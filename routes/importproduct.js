const express= require('express');
const router= express.Router();
const importproductController = require('../controllers/importproduct');
router.get('/',importproductController.index);
router.post('/getproduct',importproductController.getproduct);
module.exports= router;