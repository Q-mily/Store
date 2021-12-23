const {check} = require('express-validator');
const {body} = require('express-validator');
const product = require('../../models/product');

let validateAddProduct = () => {
    return [
        check('namep', 'Tên sản phẩm không được bỏ trống.').notEmpty(),
        check('price', 'Giá sản phẩm không được bỏ trống').notEmpty(),
        check('imgInp', 'Hình ảnh sản phẩm không được bỏ trống').notEmpty()
    ];
}

let validateUpdateProduct = () => {
    return [
        check('namep', 'Tên sản phẩm không được bỏ trống.').notEmpty(),
        check('price', 'Giá sản phẩm không được bỏ trống').notEmpty(),
    ]
}

let validatorProduct = {
    validateAddProduct : validateAddProduct,
    validateUpdateProduct : validateUpdateProduct,
};

module.exports = {validatorProduct};