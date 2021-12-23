const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name: {type: String}
});

PermissionSchema.plugin(AutoIncrement, {inc_field: 'idpermission'});

module.exports = mongoose.model('Permission',PermissionSchema); 
