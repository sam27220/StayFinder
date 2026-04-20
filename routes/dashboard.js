const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const dashboardController = require("../controllers/dashboard");


router.get("/", isLoggedIn, dashboardController.DashboardInfo);

module.exports = router;