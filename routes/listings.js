const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validatorListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const User = require("../models/user.js");




router 
  .route("/")
  //index
  .get(wrapAsync(listingController.index))

  // create list
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validatorListing,
    wrapAsync(listingController.createlisting),
  );

router.get("/wishlist", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  res.render("listings/wishlist.ejs", {
    listings: user.wishlist
  });
});
 
//search routes
router.get("/search", listingController.searchListing);

// create route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // show routes
  .get(wrapAsync(listingController.showListing))

  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validatorListing,
    wrapAsync(listingController.updateListing),
  )
  // Delete Routes
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit routes
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.rederEditForm),
);


// Add/Remove Wishlist
router.post("/wishlist/:id", isLoggedIn, listingController.wishlistlogic);


module.exports = router;
