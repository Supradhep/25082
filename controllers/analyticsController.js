// controllers/analyticsController.js
const Travel = require("../models/Travel");

exports.transportCounts = async (req, res) => {
  try {
    // If you want per-user analytics, filter with { userId: req.user.id }
    const data = await Travel.aggregate([
      { $group: { _id: "$modeOfTransport", count: { $sum: 1 } } },
      { $project: { _id: 0, mode: "$_id", count: 1 } }
    ]);

    // Returns array like: [{ mode: "Car", count: 10 }, { mode: "Bus", count: 5 }]
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
