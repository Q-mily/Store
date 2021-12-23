const customer = require('../models/customer');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const { body, validationResult } = require('express-validator');


class CustomerController {
    // [GET] /customers
    index(req, res, next) {
        customer.find({})
            .then(customers => {
                res.render('customer/customer', {
                    customers: multipleMongooseToObject(customers),
                    isCreated: req.session.isCreated,
                    isUpdated: req.session.isUpdated,
                    isDeleted: req.session.isDeleted
                });
                delete req.session.isCreated
                delete req.session.isUpdated
                delete req.session.isDeleted
            })
            .catch(next);

    }
    // [GET] /customers/create
    create(req, res, next) {
        res.render('customer/create');
    }

    // [POST] /customers/store
    store(req, res, next) {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            res.render('customer/create',{
                alerts : alerts,
                values : req.body
            });
            return;
            //return res.status(400).json({ errors: errors.array() });
        }

        const storeCustomer = new customer(req.body);
        storeCustomer.save()
            .then(() => {
                req.session.isCreated = 'true',
                res.redirect('/customers')
            })
            .catch(next);
    }

    // [GET] /customers/:id/edit
    edit(req, res, next) {
        customer.findById(req.params.id)
            .then(editCustomer => res.render('customer/edit', {
                editCustomer: mongooseToObject(editCustomer)
            }))
            .catch(next);
    }

    // [PUT] /customers/:id
    update(req, res, next) {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            res.render('customer/edit',{
                alerts : alerts,
                values : req.body,
                id : req.params.id
            });
            //res.redirect('back');
            return;
            //return res.status(400).json({ errors: errors.array() });
        }

        customer.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                req.session.isUpdated= 'true',
                res.redirect("/customers")
            })
            .catch(next);
    }

    // [DELETE] /customers/:id
    delete(req, res, next) {
        customer.deleteOne({ _id: req.params.id })
            .then(() => {
                req.session.isDeleted = 'true';
                res.redirect('back')
            })
            .catch(next);
    }
}

module.exports = new CustomerController;