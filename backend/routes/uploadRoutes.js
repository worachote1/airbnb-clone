const express = require('express');
const router = express.Router();
const { uploadFromDevice, uploadByLink } = require('../controllers/uploadController');

router.post('/by-link', uploadByLink)
router.post('/', uploadFromDevice)

module.exports = router;