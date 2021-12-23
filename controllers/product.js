var upload = require('../middleware/upload');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const multer = require('multer');
var Product = require('../models/product');
const typeproduct = require('../models/typeproduct');
const dvt= require('../models/dvt');
class productController {
    //[GET]
    async edit(req, res, next) {
        let id = req.params.id;
        Product.findOne({ _id: id }, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                typeproduct.find({}, (err, item1) => {
                    dvt.find({},(err, items2)=>{
                        res.render('product/edit', {item: mongooseToObject(item), item1: multipleMongooseToObject(item1), items2: multipleMongooseToObject(items2)})

                    })
                });
            }
        })
    }
    //[POST]
    delete(req, res) {
        let id = req.params.id;
        Product.findOneAndDelete({ "_id": id }, (err, doc) => {
            if (err) {
                console.log(err);
            }
            req.session.isProductDeleted = 'true';
            res.redirect('/product');
        })
    }
    //[GET]
    index(req, res, next) {
        Product.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An erro occurred', err);
            }
            else {
                Product.aggregate([{
                    $lookup: {
                        from: "typeproducts", // collection name in db
                        localField: "idType",
                        foreignField: "idType",
                        as: "a"
                    }
                }]).exec(function(err, itemm) {
                    typeproduct.find({},(err, items1)=>{
                        dvt.find({},(err,items2)=>{
                            res.render('product/product', {items1: multipleMongooseToObject(items1), 
                                items: itemm,
                                items2: multipleMongooseToObject(items2),
                                isTypeCreated : req.session.isTypeCreated,
                                isTypeDeleted : req.session.isTypeDeleted,
                                isProductDeleted : req.session.isProductDeleted,
                                isProductCreated : req.session.isProductCreated,
                                isProductUpdated : req.session.isProductUpdated
                            });
                            delete req.session.isTypeCreated
                            delete req.session.isTypeCreated
                            delete req.session.isProductDeleted
                            delete req.session.isProductCreated
                            delete req.session.isProductUpdated
                        })
                    })
                });

            }
        })
    }
    //[POST]
    async update(req, res, next) {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                console.log("erro");
            }
            else if (err) {
                console.log(err);
            }
            else {
                if (req.file) {
                    Product.findOne({ "_id": req.body.id }, async (err, data) => {
                        data.Name = req.body.Name;
                        data.Price = req.body.Price;
                        data.Image = req.file.filename;
                        data.idType = req.body.idType;
                        data.dvt= req.body.dvt;
                        data.Quantity = req.body.Quantity;
                        await data.save();
                        req.session.isProductUpdated = 'true';
                        res.redirect('/product');
                    })
                }
                else {
                    Product.findOne({ "_id": req.body.id }, async (err, data) => {
                        data.Name = req.body.Name;
                        data.idType = req.body.idType;
                        data.Price = req.body.Price;
                        data.dvt= req.body.dvt;
                        data.Quantity = req.body.Quantity;
                        await data.save();
                        req.session.isProductUpdated = 'true';
                        res.redirect('/product');
                    })
                }
            }
        })
    }

    //[POST]
    async create(req, res, next) {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                console.log("erro");
            }
            else if (err) {
                console.log(err);
            }
            else {
                var product = new Product({
                    Name: req.body.Name,
                    idType: req.body.idType,
                    Quantity: 0,
                    dvt: req.body.dvt,
                    Price: req.body.Price,
                    Image: req.file.filename
                })
                await product.save();
            }
        })
        req.session.isProductCreated = 'true';
        res.redirect('/product');
    }
}
module.exports = new productController;