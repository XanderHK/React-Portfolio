const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const express = require("express")
const UsersCollection = require('../config/models/user.js')
const TokensCollection = require('../config/models/token.js')
const router = express.Router()
require('dotenv').config()

router.post('/register', async (req, res) => {
    try {
        const body = req.body

        if (body.username === undefined || body.email === undefined || body.password === undefined) {
            res.status(422).send('One or more required fields are missing')
            return
        }

        const user = await UsersCollection.findOne({ email: body.email })

        if (user) {
            res.status(422).send('Email already in use')
            return
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

        res.status(200).json({ message: 'Account created' })
        return
    } catch (error) {
        res.status(500).send(error)
        return
    }
})

router.post('/login', async (req, res) => {
    try {
        const body = req.body

        const user = await UsersCollection.findOne({ email: body.email })
        if (user) {
            const validPassword = await bcrypt.compare(body.password, user.password)
            if (validPassword) {
                const accessToken = jwt.sign({ username: user.username, userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '15s' })
                const refreshToken = jwt.sign({ username: user.username, userid: user.userid }, process.env.REFRESH_TOKEN_SECRET)

                await TokensCollection.create({
                    userid: user.userid,
                    token: refreshToken
                })

                res.status(200).json({
                    accessToken
                })
                return
            }
        } else {
            res.status(401).json({ error: "User does not exist" })
            return
        }
    } catch (error) {
        res.status(500).send(error)
        return
    }
})

router.post('/token', (req, res) => {
    try {
        const { token } = req.body

        if (!token) {
            res.status(401).send()
            return
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).send()
                return
            }

            const refreshToken = TokensCollection.findOne({ userid: user.userid })

            if (refreshToken) {
                const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '15s' })
                res.status(200).json({
                    accessToken
                })
                return
            } else {
                res.status(401).send()
                return
            }

        })
    } catch (error) {
        res.status(500).send(error)
        return
    }
})

router.post('/token-expired', (req, res) => {
    try {
        const { token } = req.body
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(200).send(true)
                return
            }
            res.status(200).send(false)
            return
        })
    } catch (error) {
        res.status(500).send(error)
        return
    }
});



module.exports = router;