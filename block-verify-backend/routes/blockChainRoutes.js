const express = require("express");
const router = express.Router();
const blockchainService = require("../services/blockchainService");

// Get entire blockchain
router.get("/chain", async (req, res) => {
  try {
    const blockchain = await blockchainService.getBlockchain();
    
    res.status(200).json({
      success: true,
      length: blockchain.length,
      chain: blockchain
    });
  } catch (error) {
    console.error("Error fetching blockchain:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blockchain",
      error: error.message
    });
  }
});

// Verify blockchain integrity
router.get("/verify", async (req, res) => {
  try {
    const result = await blockchainService.verifyBlockchain();
    
    res.status(200).json({
      success: true,
      valid: result.valid,
      message: result.message
    });
  } catch (error) {
    console.error("Error verifying blockchain:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying blockchain",
      error: error.message
    });
  }
});

// Get latest block
router.get("/latest", async (req, res) => {
  try {
    const latestBlock = await blockchainService.getLatestBlock();
    
    res.status(200).json({
      success: true,
      data: latestBlock
    });
  } catch (error) {
    console.error("Error getting latest block:", error);
    res.status(500).json({
      success: false,
      message: "Error getting latest block",
      error: error.message
    });
  }
});

module.exports = router;