const Booking = require("../models/booking");

module.exports.renderBooking = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    "listing",
  );
  const validBookings = bookings.filter((b) => b.listing !== null);
  res.render("listings/booking.ejs", { bookings: validBookings });
}

module.exports.statusCancel = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "cancelled",
  });

  res.redirect("/bookings");
}

module.exports.statusCancelByowner =  async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "cancelled_by_owner",
  });

  res.redirect("/owner");
}