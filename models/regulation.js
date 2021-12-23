const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const regulationSchema = new Schema({
    name: {type: String},
    value: {type: Number},
});

regulationSchema.plugin(AutoIncrement, {inc_field: 'idregulation'});

module.exports = mongoose.model('regulation',regulationSchema); 
