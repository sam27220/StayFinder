const Listing = require("../models/listing");
const User = require("../models/user");


module.exports.index = async (req, res) => {

  let filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const allListings = await Listing.find(filter);

  res.render("listings/index.ejs", {
    allListings,
    currUser: req.user
  });

};

module.exports.searchListing = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.redirect("/listings");
  }
  const listings = await Listing.find({
    title: { $regex: query, $options: "i" },
  });
  res.render("listings/index.ejs", { allListings: listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requsted for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createlisting = async (req, res, next) => {
  

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.rederEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requsted for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/c_fill,/h_250,w_250",
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};


module.exports.wishlistlogic = async (req, res) => {
    const user = await User.findById(req.user._id);
    const listingId = req.params.id;

    const exists = user.wishlist.some(id => id.equals(listingId));

    if (exists) {
      user.wishlist.pull(listingId);
    } else {
      user.wishlist.push(listingId); 
    }

    await user.save();

    return res.json({
      success: true,
      wishlist: user.wishlist
    });
}