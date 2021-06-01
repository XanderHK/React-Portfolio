const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const express = require("express");
const UsersCollection = require('../config/models/user.js')
const router = express.Router();
require('dotenv').config()


router.post('/register', async (req, res) => {
    const body = req.body

    const user = await UsersCollection.findOne({ email: body.email })

    if (user) {
        res.send('E-mail already in use.')
    }

    const lastId = await UsersCollection.find({}).limit(1).sort({ $natural: -1 }).then(res => {
        return res[res.length - 1] === undefined ? "0" : res[res.length - 1].userid
    })

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    await UsersCollection.create([{
        userid: String(Number(lastId) + 1),
        username: body.username,
        email: body.email,
        password: body.password
    }])

    res.send('Account created')
})

router.post('/login', async (req, res) => {
    const body = req.body

    const user = await UsersCollection.findOne({ email: body.email })
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password)
        if (validPassword) {
            const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
            res.status(200).json({
                accessToken
            })
        }
    } else {
        res.status(401).json({ error: "User does not exist" })
    }
})

module.exports = router;