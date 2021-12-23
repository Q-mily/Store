const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {type: String}
});

RoleSchema.plugin(AutoIncrement, {inc_field: 'idrole'});

module.exports = mongoose.model('Role',RoleSchema); 
