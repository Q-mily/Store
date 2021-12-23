const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
const moment = require('moment');
const {validationResult} = require('express-validator');
const req = require('express/lib/request');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const RoleToPermission = require("../models/RoleToPermission");
class apiController {

    // [POST ] validuser
    valid_user(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    //[POST] validLogin
    valid_login(req,res){
        const result = validationResult(req);      
        res.json(result);
    }


    // [POST ] valid-supplier
    valid_supplier(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    // [POST ] valid-customer
    valid_customer(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    // [POST ] valid-supplier
    valid_supplier(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    // [POST ] valid-typeproduct
    valid_typeproduct(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    valid_product(req,res){
        const result = validationResult(req);      
        res.json(result);
    }

    async verify_permisson(req,res,next){
        var token = req.headers.token;
        var idpermission = req.headers.idpermission;
        var decodeToken = jwt.verify(token, 'mk');
        var user = await User.findOne({_id: decodeToken._id});
        if( user.iduser == 1){
            res.json({error:false});
        }else{
            var rs = await RoleToPermission.findOne({idrole: 2, idpermission: idpermission});
            if(rs){
                res.json({
                    error: false,
                    msg: "Thanh cong",
                });
            }
            else{
                res.json({error: true});
            }
        }
    }
}

module.exports = new apiController;