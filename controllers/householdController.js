const Household = require("../models/Household");

// Add household
const addHousehold = async (req, res) => {
  try {
    const { userId, familySize, income, location } = req.body;

    if (!userId || !familySize || !income || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const household = new Household({
      userId,
      familySize,
      income,
      location
    });

    await household.save();
    res.status(201).json(household);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all households
const getHouseholds = async (req, res) => {
  try {
    const households = await Household.find();
    res.status(200).json(households);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addHousehold, getHouseholds };
