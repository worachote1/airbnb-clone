const express = require('express');
const { createBooking, getBookingByCurUser, getBookingById } = require('../controllers/bookingController');
const router = express.Router();

router.get("/", getBookingByCurUser)
router.get("/:id", getBookingById)

router.post("/", createBooking)

module.exports = router;