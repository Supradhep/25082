const express = require("express");
const Travel = require("../models/Travel");
const auth = require("../middleware/auth");
const router = express.Router();

// GET /api/analytics (user-specific analytics)
router.get("/", auth, async (req, res) => {
  try {
    const stats = await Travel.aggregate([
      { $match: { user: req.user.id } },   // ✅ only this user's data
      { $group: { _id: "$modeOfTransport", count: { $sum: 1 } } }
    ]);

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
