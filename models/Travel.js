const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    modeOfTransport: { 
      type: String, 
      required: true, 
      enum: ["Car", "Bus", "Train", "Bike", "Walk", "Other"] // ✅ restricts to valid options
    },
    distance: { type: Number, required: true, min: 0 }, // ✅ must be non-negative
    duration: { type: Number, required: true, min: 0 }, // ✅ must be non-negative
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // ✅ createdAt, updatedAt fields
);

module.exports = mongoose.model("Travel", TravelSchema);
