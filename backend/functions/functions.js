const PermissionCollection = require('../config/models/permission.js')
const UserPermissionCollection = require('../config/models/userpermission.js')

/**
 * 
 * @param {*} userid 
 * @returns 
 */
async function getAllUserPermissions(userid) {
    const permissionCouples = await UserPermissionCollection.find({ userid: userid })
    const permissions = []
    for (const permissionCouple of permissionCouples) {
        const permission = await PermissionCollection.findOne({ permissionid: permissionCouple.permissionid })
        permissions.push(permission)
    }
    console.log(permissions)
    return permissions
}

module.exports = { getAllUserPermissions }