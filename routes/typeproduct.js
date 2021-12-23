const express= require('express');
const router= express.Router();
const typeproductController= require('../controllers/typeproduct');
router.get('/',typeproductController.index);
module.exports= router;