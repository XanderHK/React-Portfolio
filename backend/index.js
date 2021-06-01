const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors');
const app = express();
const port = 9900
const connectDB = require('./config/database/db.js')
const authRoutes = require('./routes/authRoutes.js')
const dashboardRoutes = require('./routes/dashboardRoutes.js')
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

app.listen(port, () => console.log("Server is running on port: " + port))