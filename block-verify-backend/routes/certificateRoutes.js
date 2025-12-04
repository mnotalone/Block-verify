const express = require("express");
const router = express.Router();

const {
  addCertificate,
  verifyCertificate,
  getAllCertificates,
  downloadCertificate,
  getCertificateStats
} = require("../controllers/certificateController");

// Add new certificate
router.post("/add", addCertificate);

// Verify certificate by hash
router.get("/verify/:hash", verifyCertificate);

// Download certificate PDF
router.get("/download/:hash", downloadCertificate);

// Get all certificates
router.get("/all", getAllCertificates);

// Get statistics
router.get("/stats", getCertificateStats);

module.exports = router;