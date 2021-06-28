const mongoose = require('mongoose')

const UserPermissionSchema = new mongoose.Schema({
    permissionid: { type: String, required: true },
    userid: { type: String, required: true }
}, { collection: 'user_permissions' })

const model = mongoose.model('UserPermissions', UserPermissionSchema)

module.exports = model