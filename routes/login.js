const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');

router.post('/submit',loginController.submit);
router.post('/',loginController.login);
router.get('/', loginController.index);

module.exports = router;