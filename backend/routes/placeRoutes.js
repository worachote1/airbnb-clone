const express = require('express');
const router = express.Router();
const { uploadFromDevice, uploadByLink } = require('../controllers/uploadController');
const { createPlace } = require('../controllers/placeController');

// router.post('/', uploadFromDevice)
// router.post('/by-link', uploadByLink)
// router.post('/time44',(req,res) => {
//     console.log("prntestPlaceAPI")
// })

router.post('/', createPlace)

module.exports = router;