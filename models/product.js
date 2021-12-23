var mongoose = require('mongoose');
var product = new mongoose.Schema({
    Name: String,
    idType: Number,
    Image: String,
    Price: Number,
    Quantity: Number,
    dvt:String,
})
module.exports = new mongoose.model('product',product);