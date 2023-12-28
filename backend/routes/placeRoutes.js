const express = require('express');
const router = express.Router();
const { createPlace, getAllplaces, getPlacesByCurUser,getPlaceById, updatePlace } = require('../controllers/placeController');

router.get('/', getAllplaces)
router.get('/user', getPlacesByCurUser)
router.get('/:id', getPlaceById)

router.post('/', createPlace)

router.put('/:id',updatePlace)

module.exports = router; 