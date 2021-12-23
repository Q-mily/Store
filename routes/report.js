const express= require('express');
const router = express.Router();
const controllerReport= require('../controllers/report');
router.get('/', controllerReport.index);
router.post('/getdata', controllerReport.getdata);
router.get('/getdata', controllerReport.dayyyy);
module.exports= router;