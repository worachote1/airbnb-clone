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
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        next(createError(400, "Login fail !"));      
    }


}

module.exports = { register, login }