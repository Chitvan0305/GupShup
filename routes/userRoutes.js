const express = require("express")
const {loginUser, signUp} = require("../controllers/auth")
const userRoute = express.Router()

userRoute.post('/register', signUp);
userRoute.post('/login', loginUser);

module.exports = userRoute