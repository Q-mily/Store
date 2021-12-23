const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplier = new Schema({
    name: { type : String, required: true},
    phone: {type : String, required: true},
    address: {type: String, required: true},
    email : {type: String, required: true},
    lastContact : {type : String, default : "Chưa nhập hàng"}
});

module.exports = mongoose.model('supplier',supplier); 