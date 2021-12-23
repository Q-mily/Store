const User = require("../models/user");
const {vaidationResult, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

class LoginController{
    //[GET] /login
    index(req,res,next){
        res.render("login/login", {layout: 'login'});
    };
    //[POST] /login
    login(req,res,next){
        var username = req.body.Username
        var password = req.body.Password
        User.findOne({
            username: username,
            password: password
        })
        .then(data =>{
            if(data){
                var token = jwt.sign({
                    _id : data._id,
                },'mk')
                return res.json({
                    message : 'thanh cong',
                    token : token
                })
            }else{
                return res.json('that bai')
            }
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
    };
    //[POST] /login/submit
    submit(req,res,next){
        res.redirect('/product')
    }

    //[POST] /verify
    verify(req,res,next){
        try{
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk');
            if (result){
                //res.send('OK');
                next()
            }
        }catch(err){
            res.redirect('/login');
        }
        
    } 
}
module.exports = new LoginController();