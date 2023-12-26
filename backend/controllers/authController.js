const User = require('../Model/userModel')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError(400, "This user email already taken."));
        }   

        const salt = await bcrypt.genSalt(10);
        const user = await User.create({
            name, email, password: bcrypt.hashSync(password, salt)
        })

        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        next(createError(400, "Register fail !"));
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email })
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password !"))
        }

        //create token
        const token = jwt.sign({
            id: user._id,
            email : user.email
        },process.env.JWT_SECRET)

        const {password,...otherData} = user._doc;

        res.cookie("token",token,{
            httpOnly: true
        }).status(200).json({...otherData})
    }
    
    catch(err){
        console.log(err)
        next(createError(400, "Login fail !"));      
    }
}

const logout = (req,res) => {
    res.clearCookie('token').status(200).json("test clear cokie logout")
}

const profile = async (req,res,next) => {
    const {token} = req.cookies

    if(!token){
        return res.status(200).json(null)
    }
   
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(data.id)
        const {password,...otherData} = user._doc
        res.status(200).json({...otherData})
    }catch(err){
        next(createError(403,"Token is not valid!"))
    }
}

module.exports = { register, login, logout,profile }