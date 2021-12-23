const {check} = require('express-validator');
const {body} = require('express-validator');
const supplier = require('../../models/supplier');
const customer = require('../../models/customer');


let validateAddSupplier = () => {
    return [
        check('name', 'Tên nhà cung cấp không được bỏ trống.').notEmpty(),
        check('phone', 'Số điện thoại không được bỏ trống').notEmpty(),
        check('email', 'Email không được bỏ trống').notEmpty(),
        check('address', 'Địa chỉ không được trống').notEmpty(),
        check('phone', 'Số điện thoại chỉ chứa số').isNumeric(),
        check('email', 'Email không đúng định dạng').isEmail(),
        body('phone').custom( async value => {
            const p = await supplier.findOne({ phone: value });
            if (p) {
                return Promise.reject('Số điện thoại này đã được sử dụng.');
            }
        }),
        body('name').custom( async value => {
            const p = await supplier.findOne({ name: value });
            if (p) {
                return Promise.reject('Tên nhà cung cấp này đã được sử dụng.');
            }
        }),
        body('email').custom( async value => {
            const p = await supplier.findOne({ email: value });
            if (p) {
                return Promise.reject('Email này đã được sử dụng.');
            }
        })
    ];
}

let validateUpdateSupplier = () => {
    return [
        check('name', 'Tên nhà cung cấp không được bỏ trống.').notEmpty(),
        check('phone', 'Số điện thoại không được bỏ trống').notEmpty(),
        check('email', 'Email không được bỏ trống').notEmpty(),
        check('address', 'Địa chỉ không được trống').notEmpty(),
        check('phone', 'Số điện thoại chỉ chứa số').isNumeric(),
        check('email', 'Email không đúng định dạng').isEmail(),
        body('name').custom(async (value, {req}) => {
            const p = await supplier.findOne({_id: req.params.id});
            const q = await supplier.findOne({name: value});
            if(q && p.id != q.id){
                return Promise.reject('Tên nhà cung cấp này đã được sử dụng')
            }
        }),
        body('phone').custom(async (value,{req}) => {
            const p = await supplier.findOne({_id : req.params.id});
            const q = await supplier.findOne({phone: value});
            if(q && p.id != q.id){
                return Promise.reject('Số điện thoại này đã được sử dụng')
            }
        }),
        body('email').custom(async (value,{req}) => {
            const p = await supplier.findOne({_id : req.params.id});
            const q = await supplier.findOne({email: value});
            if(q && p.id != q.id){
                return Promise.reject('Email này đã được sử dụng')
            }
        })
    ]
}

let validateCreateCustomer = () => {
    return[
        check('name', "Tên không được bỏ trống.").notEmpty(),
        check('phone', "Số điện thoại không được bỏ trống.").notEmpty(),
        check('phone', "Số điện thoại phải là số.").isNumeric(),
        check('phone', "Số điện thoại chỉ bao gồm 10 số.").isLength({min : 10, max : 10}),
        check('email', "Email không được bỏ trống.").notEmpty(),
        check('email', "Email không đúng định dạng.").isEmail(),
        check('address', "Địa chỉ không được bỏ trống.").notEmpty(),
        body('phone').custom( async value => {
            const p = await customer.findOne({ phone: value });
            if (p) {
                return Promise.reject('Số điện thoại này đã được sử dụng.');
            }
        }),
        body('email').custom( async value => {
            const p = await customer.findOne({ email: value });
            if (p) {
                return Promise.reject('Email này đã được sử dụng.');
            }
        }),
    ];
}
let validateEditCustomer = () => {
    return [
        check('name', "Tên không được bỏ trống").notEmpty(),
        check('phone', "Số điện thoại không được bỏ trống").notEmpty(),
        check('phone', "Số điện thoại phải là số.").isNumeric(),
        check('phone', "Số điện thoại chỉ bao gồm 10 số.").isLength({min : 10, max : 10}),
        check('email', "Email không được bỏ trống").notEmpty(),
        check('email', "Email không đúng định dạng").isEmail(),
        check('address', "Địa chỉ không được bỏ trống").notEmpty(),
        body('phone').custom( async (value, {req}) => {
            const p = await customer.findById({_id : req.params.id});
            const q = await customer.findOne({phone : value});
            
            if(q && q.phone!= p.phone) {
                return Promise.reject('Số điện thoại này đã được sử dụng.');
            }
        }),
        body('email').custom( async (value, {req}) => {
            const p = await customer.findById({_id : req.params.id});
            const q = await customer.findOne({email : value});

            if(q && q.email != p.email) {
                return Promise.reject('Email này đã được sử dụng.');
            }
        })
    ];
}

let validator = {
    validateAddSupplier : validateAddSupplier,
    validateUpdateSupplier : validateUpdateSupplier,
    validateCreateCustomer : validateCreateCustomer,
    validateEditCustomer : validateEditCustomer
};

module.exports = {validator};
