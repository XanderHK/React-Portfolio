const express = require("express");
const authenticateJWT = require('../middleware/AuthenticateJWT.js')
const UsersCollection = require('../config/models/user.js')
const router = express.Router();
require('dotenv').config()

router.get('/registeredUsers', authenticateJWT, (req, res) => {
    UsersCollection.find({}, function (err, users) {
        const userMap = [];

        users.forEach(function (user) {
            userMap.push(user)
        });

        res.send(userMap);
    });
})


module.exports = router