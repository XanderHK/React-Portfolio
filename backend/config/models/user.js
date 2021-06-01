const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userid: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'users' })

UserSchema.index({ userid: 1 }, { unique: true })

const model = mongoose.model('Users', UserSchema)

module.exports = model