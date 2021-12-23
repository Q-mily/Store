var mongoose = require('mongoose');
var importproduct = new mongoose.Schema({
    idsupplier: String,
    importdate: {type: Date, default: Date.now},
    summoney: Number
})
module.exports = new mongoose.model('importproduct',importproduct);