const {check} = require('express-validator');
const {body} = require('express-validator');
const typeproduct = require('../../models/typeproduct');

let validateAddTypeProduct = () => {
    return [
        check('displayname', 'Tên loại sản phẩm không được bỏ trống.').notEmpty(),
        body('displayname').custom( async value => {
            const p = await typeproduct.findOne({ displayname: value });
            if (p) {
                return Promise.reject('Loại sản phẩm nãy đã có trong hệ thống');
            }
        }),
    ]
}

let validatorTypeproduct = {
    validateAddTypeProduct : validateAddTypeProduct,
};

module.exports = {validatorTypeproduct};