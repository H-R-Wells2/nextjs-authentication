import { prisma } from '@/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createPasswordResetToken(email: string): Promise<string> {
  const token = generateResetToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete any existing tokens for this email
  await prisma.passwordResetToken.deleteMany({
    where: { email },
  });

  // Create new reset token
  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return token;
}

export async function validateResetToken(token: string): Promise<{
  success: boolean;
  email?: string;
  error?: string;
}> {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return { success: false, error: 'Invalid reset token' };
    }

    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { token },
      });
      return { success: false, error: 'Reset token has expired' };
    }

    return { success: true, email: resetToken.email };
  } catch (error) {
    console.error('Error validating reset token:', error);
    return { success: false, error: 'Failed to validate token' };
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const validation = await validateResetToken(token);
    
    if (!validation.success || !validation.email) {
      return { success: false, error: validation.error };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await prisma.user.update({
      where: { email: validation.email },
      data: { password: hashedPassword },
    });

    // Delete the used token
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error: 'Failed to reset password' };
  }
}

export async function canRequestPasswordReset(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return { success: true };
    }

    // Check if there's a recent token (rate limiting)
    const recentToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        },
      },
    });

    if (recentToken) {
      return { 
        success: false, 
        error: 'A password reset email was recently sent. Please wait before requesting another.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error checking reset eligibility:', error);
    return { success: false, error: 'Failed to process request' };
  }
}