import { prisma } from '@/prisma';
import crypto from 'crypto';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createVerificationToken(email: string): Promise<string> {
  const token = generateVerificationToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Delete any existing tokens for this email
  await prisma.emailVerificationToken.deleteMany({
    where: { email },
  });

  // Create new verification token
  await prisma.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return token;
}

export async function verifyEmailToken(token: string): Promise<{
  success: boolean;
  email?: string;
  error?: string;
}> {
  try {
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return { success: false, error: 'Invalid verification token' };
    }

    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.emailVerificationToken.delete({
        where: { token },
      });
      return { success: false, error: 'Verification token has expired' };
    }

    const email = verificationToken.email;

    // Update user as verified
    await prisma.user.update({
      where: { email },
      data: { 
        verified: true,
        emailVerified: new Date()
      },
    });

    // Delete the used token
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    return { success: true, email };
  } catch (error) {
    console.error('Error verifying email token:', error);
    return { success: false, error: 'Failed to verify email' };
  }
}

export async function resendVerificationEmail(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.verified) {
      return { success: false, error: 'Email is already verified' };
    }

    // Check if there's a recent token (rate limiting)
    const recentToken = await prisma.emailVerificationToken.findFirst({
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
        error: 'A verification email was recently sent. Please wait before requesting another.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error checking resend eligibility:', error);
    return { success: false, error: 'Failed to process request' };
  }
}