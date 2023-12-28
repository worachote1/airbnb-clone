const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const Place = require('../model/placeModel')


const getAllplaces = async (req, res, next) => {
    try {
        const allPlaces = await Place.find()
        res.status(200).json(allPlaces)
    } catch (err) {
        console.log(err)
        next(createError(400, "Can not get all places"))
    }
}

const createPlace = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const place = await Place.create({
            owner: data.id, ...req.body
        })
        res.status(200).json(place)
    } catch (err) {
        console.log(err)
        next(createError(401, 'Unauthorized: Invalid token'));
    }
}

const updatePlace = async (req, res, next) => {
    const { id } = req.params
    const { token } = req.cookies;
    if (!token) {
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const place = await Place.findById(id)
        //only owner of that property can update
        if (data.id !== place.owner.toString()) {
            return next(createError(403, "You are not authorized to perform this action."))
        }
        const updatedPlace = await Place.findByIdAndUpdate(id, { ...req.body }, {
            new: true
        })
        res.status(200).json(updatedPlace)
    } catch (err) {
        console.log(err)
        next(createError(401, 'Unauthorized: Invalid token'));
    }
}

const getPlacesByCurUser = async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const allPlaces = await Place.find({ owner: data.id })
        res.status(200).json(allPlaces)
    } catch (err) {
        console.log(err)
        next(createError(400, "Can not get places"))
    }
}

const getPlaceById = async (req, res, next) => {

    try {
        const { id } = req.params
        const place = await Place.findById(id)
        res.status(200).json(place)
    } catch (err) {
        console.log(err)
        next(createError(400, "Can not get places by id"))
    }
}

module.exports = { createPlace, getAllplaces, getPlacesByCurUser, getPlaceById, updatePlace }