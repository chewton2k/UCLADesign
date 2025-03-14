const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const dormRoutes = require("./routes/dormRoutes"); 
const designRoutes = require("./routes/designRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose
  .connect(MONGO_URI, clientOptions)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/furniture", furnitureRoutes);
app.use("/api/dorms", dormRoutes);
app.use("/api/designs", designRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});