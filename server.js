const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const householdRoutes = require("./routes/householdRoutes");
const travelRoutes = require("./routes/travelRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/api/users", userRoutes);
app.use("/api/household", householdRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/analytics", analyticsRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Connect DB & start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected"); // <-- Add this log here
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });
