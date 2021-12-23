const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new Schema({
    nameCustomer: {type: String, default: null},
    phoneCustomer: {type:Number, default: null},
    createAt: {type: Date, default: Date.now()},
    isPay: {type: Boolean, default: false}, 
});

OrderSchema.plugin(AutoIncrement, {inc_field: 'idOrder'});

module.exports = mongoose.model('order',OrderSchema); 