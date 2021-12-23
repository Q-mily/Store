const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const RoleToPermissionSchema = new Schema({
    idrole: {type: Number},
    idpermission: {type:Number},
});

module.exports = mongoose.model('RoleToPermission',RoleToPermissionSchema); 
