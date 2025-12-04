const QRCode = require('qrcode');

class QRGenerator {
  static async generateQRCode(certificateHash) {
    try {
      // Generate verification URL
      const verificationURL = `http://localhost:5000/api/certificates/verify/${certificateHash}`;
      
      // Generate QR code as data URL
      const qrCodeDataURL = await QRCode.toDataURL(verificationURL, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return {
        success: true,
        qrCode: qrCodeDataURL,
        verificationURL
      };
    } catch (error) {
      throw new Error('Error generating QR code: ' + error.message);
    }
  }
}

module.exports = QRGenerator;