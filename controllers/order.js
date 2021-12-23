const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
//const User = require('../models/user');
//const moment = require('moment');
const Product = require('../models/product');
const TypeProduct = require('../models/typeproduct');
const customer= require('../models/customer');
const Order = require('../models/pos/order');
const Order_detail = require('../models/pos/order_detail');
const Invoice = require('../models/pos/invoice');

class OrderController {
    // [GET] /
    async index(req, res,next) {
        var orders_isnotpay = await Order.find({isPay:false}).lean();
        var invoices = await Invoice.find({isPay: true}).lean();

        res.render('order/orderlist',{
            orders_isnotpay : orders_isnotpay,
            orders_ispay : invoices
        });
    }

    // [GET] / pos
    async pos(req,res, next){
        var data=[];
        var sub;
        var products;
        var types = await TypeProduct.find({}).lean();
        
        var promise = new Promise(
            async function(resolve, reject){
                for (let i = 0; i< types.length; i++){
                    sub = {
                        category: types[i].displayname,
                        items:[],
                    };
                    sub.items = await Product.find({idType: types[i].idType}).lean();
                    data.push(sub);
                }
                resolve(data);
            }
        );

        promise.then(function(data){ 
            customer.find({},(err, item)=>{
                res.render('order/pos', {data: data, customer: multipleMongooseToObject(item)});
            })
          
        })
    }

    // [POST] /oders/orderandpay
    async OrderAndPay(req,res,next){
        var items = req.body.order_details;
        var order = await Order.create({
            nameCustomer: req.body.idCustomer,
            isPay: true,
        });
        console.log(items);
        var invoice_data = {
            idOrder: order.idOrder,
            total : req.body.totalCart,
            quantity: req.body.totalQuantity,
            discount: req.body.totalDiscount,
            total_payment: req.body.totalPayment,
            nameCustomer: req.body.idCustomer,
        }
        await items.forEach( async (item) =>{
            let data = {
                idOrder: order.idOrder,
                idProduct: item.id,
                quantity: item.quantity,
                unitPrice: item.unitprice,
                unitDiscount: item.discount,
                total: item.total,
                total_payment: item.totalEND,
            };
            await Product.findOneAndUpdate({_id:item.id},{
                $inc : {
                    Quantity : item.quantity * -1,
                }
            });
            Order_detail.create(data);
        });
        await Invoice.create(invoice_data);

        res.status(201).json({
            msg: 'Đã thanh toán'
        });
    }

    async deleteOrder(req, res, next){
        var ID = req.params.id;
        await Order_detail.deleteMany({idOrder: ID});
        await Order.deleteMany({idOrder: ID});
        res.redirect('/orders');
    }

     // [POST] /oders/order     //chua xong
    async Order(req, res, next){
        var data;
        var items = req.body.order_details;

        var order = await Order.create({isPay: false});
        await items.forEach( item =>{
            data = {
                idOrder: order.idOrder,
                idProduct: item.id,
                quantity: item.quantity,
                unitPrice: item.unitprice,
                unitDiscount: item.discount,
                total: item.total,
                total_payment: item.totalEND,
            };
            Order_detail.create(data);
        });

        res.status(201).json({
            msg: 'Đã Lưu lại!'
        });
    }
}

module.exports = new OrderController;