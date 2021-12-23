const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
var Product = require('../models/product');

const typeproduct = require('../models/typeproduct');
class importproductController{
    getproduct(req, res, next){
        Product.findOne({_id: req.body.id},(err, items) =>{
            res.json({item: items});    
        })
    }

    index(req,res, next){
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
                        res.render('importproduct/importproduct', {items1: multipleMongooseToObject(items1), items: itemm});
                    })
                }); 
                
            }
        })
    }
}
module.exports = new importproductController;