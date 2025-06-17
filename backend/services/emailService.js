const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();
  
  const { name, email, subject, message } = contactData;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your email where you want to receive messages
    subject: `Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #4b5563;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>Reply to:</strong> ${email}
          </p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>This email was sent from the Smart Recipes contact form.</p>
          <p>Received on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Smart Recipes - Your OTP Code',
    text: `Hello ${name},

Your OTP for Smart Recipes verification is: ${otp}

This code will expire in 10 minutes.

If you didn't request this, please ignore this email.

Best regards,
Smart Recipes Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Smart Recipes</h1>
          <p style="color: #fef3c7; margin: 10px 0 0 0;">Welcome to our culinary community!</p>
        </div>
        
        <div style="background-color: #fff; padding: 40px; border: 1px solid #e5e7eb;">
          <h2 style="color: #374151; margin-top: 0;">Hi ${name}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for signing up with Smart Recipes! To complete your registration, 
            please verify your email address using the OTP code below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); 
                        color: white; font-size: 32px; font-weight: bold; 
                        padding: 20px; border-radius: 10px; letter-spacing: 5px;
                        display: inline-block; min-width: 200px;">
              ${otp}
            </div>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ This OTP will expire in 10 minutes</strong>
            </p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            If you didn't create an account with Smart Recipes, please ignore this email.
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; 
                    border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            This is an automated email from Smart Recipes. Please do not reply to this email.
          </p>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
            © ${new Date().getFullYear()} Smart Recipes. All rights reserved.
          </p>
        </div>
      </div>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

// Send welcome email after successful verification
const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Smart Recipes! 🍳',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🍳 Welcome to Smart Recipes!</h1>
        </div>
        
        <div style="background-color: #fff; padding: 40px; border: 1px solid #e5e7eb;">
          <h2 style="color: #374151; margin-top: 0;">Hi ${name}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Congratulations! Your email has been verified and your Smart Recipes account is now active.
          </p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-top: 0;">What's next?</h3>
            <ul style="color: #047857; line-height: 1.6;">
              <li>🔍 Search thousands of delicious recipes</li>
              <li>📱 Use photo search to identify dishes</li>
              <li>📅 Create personalized meal plans</li>
              <li>💎 Upgrade to Premium for exclusive features</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/dashboard" 
               style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); 
                      color: white; text-decoration: none; padding: 15px 30px; 
                      border-radius: 8px; font-weight: bold; display: inline-block;">
              Start Cooking! 🚀
            </a>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; 
                    border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            Happy cooking! - The Smart Recipes Team
          </p>
        </div>
      </div>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail
};
