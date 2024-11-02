const express = require("express")
const appRoute = express.Router()
const authenticateUser = require("../middlewares/authenticateUser")

appRoute.get('/', authenticateUser, async function(req, res){
    return res.status(200).send("Authenticated")
} );


module.exports = appRoute