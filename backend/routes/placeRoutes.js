const express = require('express');
const router = express.Router();
const { createPlace, getPlacesByCurUser,getPlaceById, updatePlace } = require('../controllers/placeController');

router.get('/', getPlacesByCurUser)
router.get('/:id', getPlaceById)

router.post('/', createPlace)

router.put('/:id',updatePlace)

module.exports = router;