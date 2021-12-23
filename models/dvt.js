var mongoose= require('mongoose');
var dvt = new mongoose.Schema({
    displayname: String
}) 
module.exports = new mongoose.model('dvt',dvt);