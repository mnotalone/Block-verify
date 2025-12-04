const express = require("express");
const cors = require("cors");  // ← Should only appear ONCE
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");
const blockchainRoutes = require("./routes/blockchainRoutes");

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/blockchain", blockchainRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("BLOCK VERIFY API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});