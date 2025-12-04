const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Check if email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️ Email credentials not configured. Email sending will be skipped.');
      this.transporter = null;
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      console.log('✅ Email service initialized');
    } catch (error) {
      console.error('❌ Email service initialization failed:', error);
      this.transporter = null;
    }
  }

  async sendCertificateEmail(recipientEmail, certificate, qrCode) {
    // Skip if transporter not configured
    if (!this.transporter) {
      console.log('⚠️ Email not sent - transporter not configured');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: '🎓 Your Certificate Has Been Issued!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50; text-align: center;">Certificate Issued!</h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h2 style="color: #34495e;">Dear ${certificate.studentName},</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                Congratulations! Your certificate from <strong>${certificate.institution}</strong> 
                has been successfully issued and verified on the blockchain.
              </p>
            </div>

            <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">🔐 Blockchain Verified</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
                Certificate Hash: <code>${certificate.certificateHash}</code>
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <img src="${qrCode}" alt="QR Code" style="max-width: 200px;"/>
              <p style="color: #7f8c8d; font-size: 14px;">Scan this QR code to verify your certificate</p>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
              This certificate is tamper-proof and permanently stored on the blockchain.<br>
              Powered by <strong>BLOCK VERIFY</strong>
            </p>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      return { success: false, message: error.message };
    }
  }
}

module.exports = new EmailService();