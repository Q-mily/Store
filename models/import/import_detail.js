const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Import_detail = new Schema({
    idImport: {type: Number, default: null},
    idProduct: {type: Schema.Types.ObjectId, default: null},
    quantity: {type: Number, default:0},
    unitPrice: {type: Number, default:0},
    total: {type:Number, default:0}
});

Import_detail.plugin(AutoIncrement, {inc_field: 'idImport_detail'});

module.exports = mongoose.model('import_detail',Import_detail); 