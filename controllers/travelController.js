// controllers/travelController.js
const Travel = require("../models/Travel");

// ✅ Add new travel
exports.addTravel = async (req, res) => {
  try {
    // ensure user comes from token
    const data = { ...req.body, user: req.user.id };
    const travel = new Travel(data);
    await travel.save();
    res.status(201).json({ message: "Travel saved", travel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all travels of logged-in user
exports.getUserTravels = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const travels = await Travel.find({ user: userId }).sort({ date: -1 });
    res.json(travels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
