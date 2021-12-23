const {check} = require('express-validator');
const User = require('../../models/user');
let valid_user = () => {
    return [
        check('name', 'Tên không được trống.').not().isEmpty(),
        check('birth').custom(value =>{
            return true;
        }),
        check('birth', 'Ngày sinh không được trống.').not().isEmpty(),
        check('address', 'Địa chỉ không được trống.').not().isEmpty(),
        check('phone', 'Số điện thoại không được trống.').not().isEmpty(),   
        check('phone').custom(value =>{
            if(value.length != 10)
                return Promise.reject("Số điện thoại phải 10 số.");
            return true;
        }),
        check('username').custom(value =>{
            return User.findOne({username: value})
                    .then(user =>{
                        if (user){
                            return Promise.reject('Username đã tồn tại.');
                        }
                    });
        }),
        check('password', 'Độ dài password tối thiểu là 6.').isLength({min:6}),
    ];
}
let valid_updateuser = () =>{
    return [
        check('name', 'Tên không được trống.').not().isEmpty(),
        check('birth').custom(value =>{
            return true;
        }),
        check('birth', 'Ngày sinh không được trống.').not().isEmpty(),
        check('address', 'Địa chỉ không được trống.').not().isEmpty(),
        check('phone', 'Số điện thoại không được trống.').not().isEmpty(),   
        check('phone').custom(value =>{
            if(value.length != 10)
                return Promise.reject("Số điện thoại phải 10 số.");
            return true;
        })   
    ];
}

let validator = {
    valid_user: valid_user,
    valid_updateuser: valid_updateuser,
}
module.exports = { validator };