const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/bookings");

router.get("/", isLoggedIn, bookingController.renderBooking);

router.post("/:id/cancel", isLoggedIn, bookingController.statusCancel);

router.post("/:id/cancelByOwner", isLoggedIn , bookingController.statusCancelByowner );

module.exports = router;
