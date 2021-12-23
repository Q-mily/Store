const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
//const User = require('../models/user');
//const moment = require('moment');
const Product = require('../models/product');
const TypeProduct = require('../models/typeproduct');
const Regulation = require('../models/regulation');
const Import = require('../models/import/import');
const Import_detail = require('../models/import/import_detail');
const Order_detail = require('../models/pos/order_detail');
const supplier = require('../models/supplier');


class ImportController {
    // [GET] /
    async index(req,res,next){
        var docs = await Import.find({}).lean();
        res.render('import/importlist',{
            invoices: docs      
        });
    }

    // [GET] /import/create        
    async create(req,res,next){
        var data=[];
        var sub;
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

        promise.then(async function(data){     
            var quydinhMinQuatity = await Regulation.findOne({idregulation: 1});
            var quydinhMaxQuatity = await Regulation.findOne({idregulation: 2});
            supplier.find({},(err,items)=>{
                res.render('import/importcreate', {
                    data: data,
                    minQuantity: quydinhMinQuatity.value,
                    maxQuantity: quydinhMaxQuatity.value,
                    supplierr: multipleMongooseToObject(items)
                });
            })
            
        })  
    }

    // [POST] /import/store 
    async Store(req,res,next){
        var items = req.body.order_details;

        var import_data = {
            idSupplier: null,
            nameSupplier:  req.body.nameSupplier,
            total : req.body.totalPayment,
            quantity: req.body.totalQuantity,           
        };
        
        var import_doc = await Import.create(import_data);

        await items.forEach( async (item) =>{
           let  data = {
                idImport: import_doc.idImport,
                idProduct: item.id,
                quantity: item.quantity,
                unitPrice: item.unitprice,
                total: item.totalEND,
            };
            var quydinhLoiNhuan = await Regulation.findOne({idregulation: 3}).lean();
            var newPrice = item.unitprice * quydinhLoiNhuan.value / 100;        
            await Product.findOneAndUpdate({_id:item.id},{
                Price: newPrice,
                $inc : {
                    Quantity : item.quantity,
                }
            });
            Import_detail.create(data);
        });

        res.status(201).json({
            msg: 'Đã thanh toán'
        });
    }
    
}

module.exports = new ImportController;