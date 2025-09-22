const mongoose = require("mongoose");

const householdSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  familySize: { type: Number, required: true },
  income: { type: Number, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Household", householdSchema);
