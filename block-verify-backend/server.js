const express = require("express");
const cors = require("cors");  // ← Should only appear ONCE
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const certificateRoutes = require("./routes/certificateRoutes");
const blockchainRoutes = require("./routes/blockchainRoutes");
connectDB();

const app = express();

// CORS Configuration: allow local dev URLs and an optional FRONTEND_URL env var
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:8080', 'http://localhost:5173'].filter(Boolean);
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
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