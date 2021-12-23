const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Invoice = new Schema({
    idOrder: {type: Number, default: null},
    quantity: {type: Number, default:0},
    discount: {type:Number, default:0},
    total: {type:Number, default:0},
    total_payment: {type:Number, default:0},
    createAt: {type:Date, default: Date.now()},
    nameCustomer:{type:String, default:null},
});

Invoice.plugin(AutoIncrement, {inc_field: 'idInvoice'});

module.exports = mongoose.model('invoice',Invoice); 