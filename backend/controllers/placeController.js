const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const Place = require('../model/placeModel')

const createPlace = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const place = await Place.create({
            owner : data.id,...req.body
        })
        res.status(200).json(place)
    } catch (err) {
        console.log(err) 
        next(createError(401, 'Unauthorized: Invalid token'));
    } 
}
 
const getPlacesByCurUser = async(req,res,next) => {
    const { token } = req.cookies;
    if(!token){
        console.log("token nullasdc")
        return next(createError(401, 'Unauthorized: No token provided'));
    }
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const allPlaces = await Place.find({owner: data.id})
        res.status(200).json(allPlaces)
    }catch(err){
        console.log(err)
        next(createError(400,"Can not get places"))
    }
}

module.exports = { createPlace,getPlacesByCurUser }