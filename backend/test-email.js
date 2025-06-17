const nodemailer = require('nodemailer');
require('dotenv').config();

// Test Gmail configuration
const testGmailConfig = async () => {
  console.log('🧪 Testing Gmail Configuration...');
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('🔑 Email Pass Length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'Not set');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ Gmail connection successful!');
    
    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from Smart Recipes',
      text: 'This is a test email to verify Gmail configuration.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Gmail configuration error:', error.message);
    console.error('🔍 Error code:', error.code);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Troubleshooting Tips:');
      console.log('1. Make sure 2-Factor Authentication is enabled on your Gmail account');
      console.log('2. Generate a new App Password from Google Account Settings');
      console.log('3. Use the App Password (16 characters) without spaces');
      console.log('4. Make sure "Less secure app access" is not needed (App Passwords bypass this)');
    }
  }
};

testGmailConfig();
