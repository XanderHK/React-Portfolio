const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.REACT_APP_DB_URL + process.env.REACT_APP_DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`Database connected : ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB