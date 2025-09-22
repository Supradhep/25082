const express = require("express");
const { addHousehold, getHouseholds } = require("../controllers/householdController");
const router = express.Router();

// Add household
router.post("/", addHousehold);

// Get all households
router.get("/", getHouseholds);

module.exports = router;
