const { getAllUserPermissions } = require('../functions/functions.js')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authenticatePerms = (req, res, next) => {
    getAllUserPermissions(req.user.userid)
    // UserPermissionCollection.find({ userid: req.user.userid }, (err, permCouples) => {
    //     const perms = permCouples.map(permCouple => {
    //         const perms = []
    //         PermissionCollection.findOne({ permissionid: permCouple.permissionid }, (err, perm) => {
    //             perms.push(perm)
    //         })
    //         console.log(perms)
    //         return perms
    //     })
    //     req.permissions = perms
    //     console.log(req.permissions)
    // })
    next()
}

module.exports = authenticatePerms