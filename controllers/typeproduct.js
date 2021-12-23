const typeproduct = require('../models/typeproduct');
const dvt= require('../models/dvt');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
class typeproductController{
    index(req,res){
        typeproduct.find({},function(err, item){
            dvt.find({}, function(err, item1 ){
                res.render('typeproduct/typeproduct', {item: multipleMongooseToObject(item), item1:multipleMongooseToObject(item1)});
            })
        })
    }
    async create_dvt(req,res){
        let type= new dvt({
            displayname: req.body.displayname,
        })
        await type.save();
        res.redirect('/typeproduct');
    }

    async create(req,res){
        let type= new typeproduct({
            displayname: req.body.displayname,
        })
        await type.save();
        res.redirect('/typeproduct');
    }
    async delete_dvt(req,res){
        let id = req.params.id;
        await dvt.findOneAndDelete({"_id":id},(err, doc)=>{
            if (err){
                console.log(err);
            }
            res.redirect('/typeproduct');
        })
        req.session.isTypeCreated = 'true';
        res.redirect('/product');
    }

    async delete(req,res){
        let id = req.params.id;
        await typeproduct.findOneAndDelete({"idType":id},(err, doc)=>{
            if (err){
                console.log(err);
            }
            res.redirect('/typeproduct');
        })
    }
}
module.exports = new typeproductController;