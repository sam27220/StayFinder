const express = require("express");
const router = express.Router();
const { isLoggedIn} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const paymentController = require("../controllers/payment.js");


// create order
router.post(
  "/create-order",
  wrapAsync(paymentController.createOrder),
);

// payment successful
router.post(
  "/success",
  isLoggedIn,
  wrapAsync(paymentController.successCode),
);

module.exports = router;
