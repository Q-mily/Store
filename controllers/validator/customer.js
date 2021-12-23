const {check} = require('express-validator');
const {body} = require('express-validator');
const customer = require('../../models/customer');

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

let validatorCustomer = {
    validateCreateCustomer : validateCreateCustomer,
    validateEditCustomer : validateEditCustomer
};

module.exports = {validatorCustomer};
