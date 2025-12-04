const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  static async generateCertificatePDF(certificate) {
    return new Promise((resolve, reject) => {
      try {
        // Create certificates directory if it doesn't exist
        const certsDir = path.join(__dirname, '../certificates');
        if (!fs.existsSync(certsDir)) {
          fs.mkdirSync(certsDir, { recursive: true });
        }

        const filename = `certificate_${certificate.certificateHash.substring(0, 10)}.pdf`;
        const filepath = path.join(certsDir, filename);

        // Create PDF document
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const stream = fs.createWriteStream(filepath);

        doc.pipe(stream);

        // Add border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

        // Title
        doc.fontSize(30)
           .font('Helvetica-Bold')
           .text('CERTIFICATE OF ACHIEVEMENT', { align: 'center' })
           .moveDown(2);

        // Content
        doc.fontSize(16)
           .font('Helvetica')
           .text('This is to certify that', { align: 'center' })
           .moveDown(1);

        doc.fontSize(24)
           .font('Helvetica-Bold')
           .text(certificate.studentName, { align: 'center' })
           .moveDown(1);

        doc.fontSize(16)
           .font('Helvetica')
           .text('has successfully completed the program at', { align: 'center' })
           .moveDown(1);

        doc.fontSize(20)
           .font('Helvetica-Bold')
           .text(certificate.institution, { align: 'center' })
           .moveDown(2);

        // Issue date
        const issueDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        doc.fontSize(14)
           .font('Helvetica')
           .text(`Issue Date: ${issueDate}`, { align: 'center' })
           .moveDown(2);

        // Blockchain verification
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .text('BLOCKCHAIN VERIFIED', { align: 'center' })
           .moveDown(0.5);

        doc.fontSize(8)
           .font('Courier')
           .text(`Certificate Hash: ${certificate.certificateHash}`, { 
             align: 'center',
             width: 500
           })
           .moveDown(1);

        // QR Code placeholder
        doc.fontSize(10)
           .font('Helvetica')
           .text('Scan to verify on blockchain', { align: 'center' });

        // Footer
        doc.fontSize(8)
           .font('Helvetica-Oblique')
           .text('This certificate is secured and verified on the blockchain', 
                 50, 
                 doc.page.height - 50, 
                 { align: 'center' });

        doc.end();

        stream.on('finish', () => {
          resolve({ success: true, filepath, filename });
        });

        stream.on('error', reject);

      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = PDFGenerator;