const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if(token){
            jwt.verify(token, process.env.JWT_SECRET);
            next()
        }else{
            return res.status(401).send("Invalid Token");
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send("Unauthorised access")
    }
    
}

module.exports = authenticateUser