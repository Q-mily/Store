const express= require('express');
const router = express.Router();
const controllerReport= require('../controllers/report');
router.get('/', controllerReport.index);
module.exports= router;