const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const typeproduct = new Schema({
    displayname: String
})
typeproduct.plugin(AutoIncrement, {inc_field: 'idType'});
module.exports = mongoose.model('typeproduct',typeproduct); 

