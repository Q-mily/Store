const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {type: String},
    birth: {type: Date},
    address: {type: String},
    img: {type: String, default: null},
    phone: {type: String},
    idrole: {type: String},
    username: {type:String},
    password: {type:String},
    isblocked: {type:Boolean, default: false},
});


UserSchema.plugin(AutoIncrement, {inc_field: 'iduser'});

module.exports = mongoose.model('Users',UserSchema); 
