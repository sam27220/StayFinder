const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  checkIn: {
    type: Date,
    required: true
  },

  checkOut: {
    type: Date,
    required: true
  },

  totalNights: {
    type: Number
  },

  pricePerNight: {
    type: Number,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentId: String,
  orderId: String,

  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);