const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.DashboardInfo = async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });

  const listingIds = listings.map((l) => l._id);

  const bookings = await Booking.find({
    listing: { $in: listingIds },
  })
    .populate("user")
    .populate("listing");

  // TOTAL EARNINGS
  let totalEarnings = 0;

  bookings.forEach((b) => {
    if (b.status === "paid") {
      totalEarnings += b.amount;
    }
  });


  for (let listing of listings) {
    const bookings = await Booking.find({ listing: listing._id });

    listing.bookingCount = bookings.length;
    listing.earnings = bookings.reduce((sum, b) => sum + b.amount, 0);
  }

  res.render("listings/dashboard.ejs", {
    listings,
    bookings,
    totalListings: listings.length,
    totalBookings: bookings.length,
    totalEarnings,
  });
};
