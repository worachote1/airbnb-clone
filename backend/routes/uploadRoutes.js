const express = require('express');
const router = express.Router();
const { uploadFromDevice, uploadByLink } = require('../controllers/uploadController');

router.post('/', uploadFromDevice)
router.post('/by-link', uploadByLink)

module.exports = router;