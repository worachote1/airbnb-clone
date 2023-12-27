const express = require('express');
const router = express.Router();
const { createPlace, getPlacesByCurUser } = require('../controllers/placeController');

router.get('/', getPlacesByCurUser)

router.post('/', createPlace)

module.exports = router;