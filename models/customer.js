const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema({
    name: { type : String, required: true},
    phone: {type : String, required: true},
    address: {type: String, required: true},
    email: {type : String, required: true},
    lastContact : {type : String, default : "Chưa mua hàng"}
});

module.exports = mongoose.model('customer',customer); 