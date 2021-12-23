const customerRouter = require('./customer');
const supplierRouter = require('./supplier');
const apiRouter = require('./api');
const siteRouter = require('./site');
const userRouter = require('./user');
const roleRouter = require('./role');
const orderRouter = require('./order');
const productRouter = require('./product');
const typeproductRouter = require('./typeproduct');
const importRouter = require('./import');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const reportRouter = require('./report');
const auth = require('../controllers/login');
function route (app) {
    app.use('/report', auth.verify ,reportRouter);
    app.use('/typeproduct', auth.verify ,typeproductRouter);
    app.use('/import', auth.verify ,importRouter);
    app.use('/product', auth.verify ,productRouter);
    app.use('/customers', auth.verify ,customerRouter);
    app.use('/users', auth.verify ,userRouter);
    app.use('/role', auth.verify ,roleRouter);
    app.use('/orders', auth.verify ,orderRouter);
    app.use('/api', apiRouter);
    app.use('/suppliers', auth.verify ,supplierRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.get('/private', auth.verify);
    app.use('/', siteRouter);
    
}

module.exports = route;