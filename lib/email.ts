import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify Your Email - HRWells",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to HRWells!</h1>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            Thank you for creating an account with HRWells! To complete your registration and start using your account, please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #00bfa5; font-size: 14px; word-break: break-all;">
            ${verificationUrl}
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This verification link will expire in 24 hours. If you didn't create an account with HRWells, you can safely ignore this email.
            </p>
          </div>
        </div>
        
        <div style="background-color: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 HRWells. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: "Failed to send verification email" };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to HRWells Community!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to HRWells Community!</h1>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${name}!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Your email has been successfully verified! You're now part of the HRWells community.
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            You can now access all features of your account. If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}" 
               style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              Go to Dashboard
            </a>
          </div>
        </div>
        
        <div style="background-color: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 HRWells. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset Your Password - HRWells",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
            We received a request to reset your password. Click the button below to create a new password for your HRWells account.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #00bfa5 0%, #13aa95 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #00bfa5; font-size: 14px; word-break: break-all;">
            ${resetUrl}
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This reset link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
        </div>
        
        <div style="background-color: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 HRWells. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error: "Failed to send password reset email" };
  }
}
