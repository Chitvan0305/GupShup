const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/User");

const signUp = async (req, res) => {
  try {

    console.log({body: req.body})

    const { name, password, email, phone } = req.body;

    if (name && phone && password && email && phone) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      await users.create({ name, password: encryptedPassword, email, phone });  
      
      return res.status(200).json({
        message: "User Successfully Registered"
      })
    }else{
        return res.status(400).json({
            message: "Fields not found"
        })
    }
  } catch (err) {
    console.log(err)
  }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email && password){
            const user = await users.findOne({email});
            
            if(user){
                const isPassword = await bcrypt.compare(password, user.password);

                if(isPassword){
                    const token = await jwt.sign({user_id: user._id}, process.env.JWT_SECRET, {
                        expiresIn: '1D'
                    });

                    return res.status(200).json({
                        message: "Succesfully Logged In",
                        token
                    })
                }else{
                    return res.status(401).json({
                        message: "Incorrect Password"
                    })
                }
            }else{
                return res.status(401).json({
                    message: "User not found"
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something Went wrong"
        })
    }
}

module.exports = {
    signUp,
    loginUser
}