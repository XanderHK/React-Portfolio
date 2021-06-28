const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    permissionid: { type: String, required: true },
    permissionstype: { type: String, requried: true }
}, { collection: 'permissions' })

PermissionSchema.index({ permissionid: 1 }, { unique: true })

const model = mongoose.model('permissions', PermissionSchema)

module.exports = model