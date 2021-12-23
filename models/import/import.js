const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ImportSchema = new Schema({
    idSupplier: {type: Schema.Types.ObjectId, default: null},
    phoneSupplier: {type:String, default: null},
    nameSupplier: {type:String, default: null},
    createAt: {type: Date, default: Date.now()},
    quantity: {type:Number, default:0},
    total:{ type:Number, default:0}
});

ImportSchema.plugin(AutoIncrement, {inc_field: 'idImport'});

module.exports = mongoose.model('import',ImportSchema); 