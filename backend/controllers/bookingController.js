const Booking = require('../model/bookingModel')
const createError = require('http-errors')
const jwt = require('jsonwebtoken');

const createBooking = async(req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("token null")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const booking = await Booking.create({
            user: data.id, ...req.body
        })
        res.status(200).json(booking)
    } catch (err) {
        console.log(err)
        next(createError(422, "Booking could not be completed"));
    }
}

const getBookingByCurUser = async(req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("token null") 
        return next(createError(401, 'Unauthorized: No token provided'));
    } 
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const booking = await Booking.find({user:data.id}).populate('place')
        res.status(200).json(booking)
    }
    catch(err){
        console.log(err)
        next(createError(422, "Can not get this booking data"));
    }
}

module.exports = {createBooking, getBookingByCurUser}