const supplier = require('../models/supplier');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
const {validationResult} = require('express-validator');

class SupplierController {
    // [GET] /suppliers
    index(req, res,next) {
        supplier.find({})
            .then(suppliers => {
                res.render('supplier/supplier',{
                    suppliers : multipleMongooseToObject(suppliers),
                    isCreated : req.session.isCreated,
                    isUpdated : req.session.isUpdated,
                    isDeleted : req.session.isDeleted
                });
                delete req.session.isCreated
                delete req.session.isUpdated
                delete req.session.isDeleted
            })
            .catch(next);
    }
    // [GET] /suppliers/create  
    create(req, res,next) {
        res.render('supplier/create');
    }

    // [POST] /suppliers/store
    store(req, res,next) {
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            res.render('supplier/create',{
                alerts: alerts,
                values : req.body
            })
            return;
        }
        //Add new supplier
        const storeSupplier = new supplier(req.body);
        //res.json(storeSupplier)
        storeSupplier.save()
            .then(() => {
                req.session.isCreated = 'true',
                res.redirect('/suppliers')
            })
            .catch(erro => {

            });
    }
     // [GET] /customers/:id/edit
     edit(req, res,next) {
        supplier.findById(req.params.id)
           .then(editSupplier => res.render('supplier/edit',{
                editSupplier : mongooseToObject(editSupplier)
           }))
           .catch(next);
   }
    // [PUT] /customers/:id
    update(req, res, next) {
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            res.render('supplier/edit',{
                alerts: alerts,
                values : req.body,
                id : req.params.id
            })
            return;
        }
        //Update supplier
        supplier.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                req.session.isUpdated = 'true',
                res.redirect("/suppliers")
            })
            .catch(next);
    }
     // [DELETE] /customers/:id
     delete(req, res, next){
        supplier.deleteOne({_id : req.params.id})
            .then(() => {
                req.session.isDeleted = 'true',
                res.redirect('back')
            })
            .catch(next);
    }
}

module.exports = new SupplierController;