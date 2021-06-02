const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    token: { type: String, required: true },
}, { collection: 'tokens' })

const model = mongoose.model('Tokens', TokenSchema)

module.exports = model