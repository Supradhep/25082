const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Travel = require("../models/Travel");

// Save travel data
router.post("/submit", auth, async (req, res) => {
  try {
    const newTravel = new Travel({
      user: req.user.id,
      ...req.body,
    });
    await newTravel.save();
    res.json(newTravel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all travels of logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const travels = await Travel.find({ user: req.user.id });
    res.json(travels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Analytics route FIRST (before userId route)
router.get("/analytics/mode", auth, async (req, res) => {
  try {
    const result = await Travel.aggregate([
      { $group: { _id: "$modeOfTransport", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get travels of a specific user
router.get("/:userId", auth, async (req, res) => {
  try {
    const travels = await Travel.find({ user: req.params.userId });
    res.json(travels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
