const Booking = require('../model/bookingModel')
const createError = require('http-errors')
const jwt = require('jsonwebtoken');

const createBooking = async (req, res, next) => {
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

const getBookingByCurUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("token null")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const booking = await Booking.find({ user: data.id }).populate('place')
        res.status(200).json(booking)
    }
    catch (err) {
        console.log(err)
        next(createError(422, "Can not get this booking data"));
    }
}


const getBookingById = async (req, res, next) => {
    const { id } = req.params
    const { token } = req.cookies
    if (!token) {
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const booking = await Booking.findById(id)
        //only owner of that booking can find by this id
        if (data.id !== booking.user.toString()) {
            return next(createError(403, "You are not authorized to perform this action."))
        }
        res.status(200).json(booking)
    } catch (err) {
        console.log(err)
        next(createError(401, 'Unauthorized: Invalid token'));
    }
}
module.exports = { createBooking, getBookingByCurUser, getBookingById }