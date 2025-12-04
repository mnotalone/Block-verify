const Certificate = require("../models/Certificate");
const crypto = require("crypto");
const blockchainService = require("../services/blockchainService");
const PDFGenerator = require("../utils/pdfGenerator");
const QRGenerator = require("../utils/qrGenerator");
const emailService = require("../utils/emailService");

// Add a new certificate with PDF, QR, and Email
const addCertificate = async (req, res) => {
  try {
    const { studentName, institution, issueDate, email } = req.body;

    if (!studentName || !institution || !issueDate) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required (studentName, institution, issueDate)" 
      });
    }

    // Generate certificate hash
    const dataToHash = studentName + institution + issueDate + Date.now().toString();
    const certificateHash = crypto
      .createHash("sha256")
      .update(dataToHash)
      .digest("hex");

    // Create certificate
    const newCertificate = new Certificate({
      studentName,
      institution,
      certificateHash,
      issueDate,
    });

    await newCertificate.save();
    console.log('✅ Certificate saved to database');

    // Add to blockchain
    const block = await blockchainService.addBlock(certificateHash);

    // Generate QR code
    const qrCodeResult = await QRGenerator.generateQRCode(certificateHash);

    // Generate PDF (optional)
    let pdfResult = null;
    try {
      pdfResult = await PDFGenerator.generateCertificatePDF(newCertificate);
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
    }

    // Send email if provided (optional)
    if (email) {
      try {
        await emailService.sendCertificateEmail(email, newCertificate, qrCodeResult.qrCode);
        console.log('✅ Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: "Certificate added successfully and recorded on blockchain",
      data: {
        certificate: {
          id: newCertificate._id,
          studentName: newCertificate.studentName,
          institution: newCertificate.institution,
          certificateHash: newCertificate.certificateHash,
          issueDate: newCertificate.issueDate
        },
        blockchain: {
          blockIndex: block.index,
          blockHash: block.hash,
          previousHash: block.previousHash,
          timestamp: block.timestamp,
          nonce: block.nonce
        },
        qrCode: qrCodeResult.qrCode,
        verificationURL: qrCodeResult.verificationURL,
        pdfGenerated: pdfResult ? true : false,
        emailSent: email ? true : false
      },
    });
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({
      success: false,
      message: "Error adding certificate",
      error: error.message,
    });
  }
};

// Download certificate PDF
const downloadCertificate = async (req, res) => {
  try {
    const { hash } = req.params;
    const certificate = await Certificate.findOne({ certificateHash: hash });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    // Generate PDF
    const pdfResult = await PDFGenerator.generateCertificatePDF(certificate);

    // Send file
    res.download(pdfResult.filepath, pdfResult.filename);
  } catch (error) {
    console.error("Error downloading certificate:", error);
    res.status(500).json({
      success: false,
      message: "Error downloading certificate",
      error: error.message
    });
  }
};

// Verify certificate
const verifyCertificate = async (req, res) => {
  try {
    const { hash } = req.params;

    const certificate = await Certificate.findOne({ certificateHash: hash });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found in database",
        verified: false,
      });
    }

    const blockchainVerification = await blockchainService.verifyCertificateInBlockchain(hash);

    // Generate QR code for this certificate
    const qrCodeResult = await QRGenerator.generateQRCode(hash);

    res.status(200).json({
      success: true,
      message: "Certificate verified successfully",
      verified: true,
      data: {
        certificate: {
          studentName: certificate.studentName,
          institution: certificate.institution,
          issueDate: certificate.issueDate,
          certificateHash: certificate.certificateHash,
          createdAt: certificate.createdAt
        },
        blockchain: blockchainVerification,
        qrCode: qrCodeResult.qrCode
      },
    });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying certificate",
      error: error.message,
    });
  }
};

// Get all certificates
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching certificates",
      error: error.message,
    });
  }
};

// Get certificate statistics
const getCertificateStats = async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const recentCertificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    const blockchain = await blockchainService.getBlockchain();
    const blockchainValid = await blockchainService.verifyBlockchain();

    res.status(200).json({
      success: true,
      data: {
        totalCertificates,
        totalBlocks: blockchain.length,
        blockchainValid: blockchainValid.valid,
        recentCertificates
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message
    });
  }
};

module.exports = {
  addCertificate,
  verifyCertificate,
  getAllCertificates,
  downloadCertificate,
  getCertificateStats
};