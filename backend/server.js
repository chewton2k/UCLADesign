const express = require("express");
const dotenv = require("dotenv");
const { run } = require("./config/db");

dotenv.config();
run();

const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/furnture", require("./routes/furnitureRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));