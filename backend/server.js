const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { run } = require("./config/db");
const router = express.Router();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes"); 

dotenv.config();
run();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/furniture", furnitureRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = router;

const MONGO_URI = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose
  .connect(MONGO_URI, clientOptions)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });