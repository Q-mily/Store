const express= require('express');
const router = express.Router();
const productController = require('../controllers/product');
const typeproductController = require('../controllers/typeproduct');

router.get('/', productController.index);
router.get('/edit/:id',productController.edit);
router.get('/deletetype/:id',typeproductController.delete);
router.get('/deletedvt/:id',typeproductController.delete_dvt);

//CRUD product
router.post('/create', productController.create);
router.post('/update',productController.update);
router.post('/delete/:id',productController.delete);
//CD type product
router.post('/createtype',typeproductController.create);
router.post('/createdvt',typeproductController.create_dvt);
module.exports = router;