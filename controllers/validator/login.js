const {check} = require('express-validator');
const {body} = require('express-validator');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

let validate_Login = () =>{
    return[
        check('Username','Tên đăng nhập không được bỏ trống!').notEmpty(),
        check('Password','Mật khẩu không được bỏ trống!').notEmpty(),
        body('Username').custom(async (value,{req}) => {
            const p = await User.findOne({username : value});
            if(!p){
                return Promise.reject('Tài khoản này không tồn tại');
            }
            else if(p.password != req.body.Password){
                return Promise.reject('Vui lòng nhập lại mật khẩu');
            }
        }),
    ]
}

let validatorLogin = {
    validate_Login : validate_Login
}
module.exports = { validatorLogin };