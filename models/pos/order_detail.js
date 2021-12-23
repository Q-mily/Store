const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Order_detail = new Schema({
    idOrder: {type: Number, default: null},
    idProduct: {type: Schema.Types.ObjectId, default: null},
    quantity: {type: Number, default:0},
    unitPrice: {type: Number, default:0},
    unitDiscount: {type:Number, default:0},
    total: {type:Number, default:0},
    total_payment: {type:Number, default:0},
});

Order_detail.plugin(AutoIncrement, {inc_field: 'idOrder_detail'});

module.exports = mongoose.model('order_detail',Order_detail); 