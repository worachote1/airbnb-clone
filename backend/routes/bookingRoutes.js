const express = require('express');
const { createBooking, getBookingByCurUser } = require('../controllers/bookingController');
const router = express.Router();

router.get("/", getBookingByCurUser)
router.post("/", createBooking)

module.exports = router;