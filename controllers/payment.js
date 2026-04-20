const Razorpay = require("razorpay");
const Booking = require("../models/booking");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


module.exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  res.json(order);
};

// nights calculate function
function calculateNights(checkIn, checkOut) {
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

module.exports.successCode = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    listingId,
    checkIn,
    checkOut,
    pricePerNight,
    amount,
  } = req.body;

  const totalNights = calculateNights(checkIn, checkOut);

  await Booking.create({
    listing: listingId,
    user: req.user._id,
    checkIn,
    checkOut,
    totalNights,
    pricePerNight,
    amount,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    status: "paid",
  });

  res.json({ success: true });
};
