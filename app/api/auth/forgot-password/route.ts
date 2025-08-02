import { NextRequest, NextResponse } from 'next/server';
import { canRequestPasswordReset, createPasswordResetToken } from '@/lib/password-reset';
import { sendPasswordResetEmail } from '@/lib/email';
import { prisma } from '@/prisma';  // Import Prisma client

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // If the user does not exist, return an error (without specifying whether the email exists or not for security reasons)
      return NextResponse.json(
        { success: false, error: 'Email not registered' },
        { status: 404 }
      );
    }

    // Check if request is allowed (rate limiting)
    const canRequest = await canRequestPasswordReset(email);
    if (!canRequest.success) {
      return NextResponse.json(
        { success: false, error: canRequest.error },
        { status: 429 }
      );
    }

    // Generate reset token and send email
    const token = await createPasswordResetToken(email);
    const emailResult = await sendPasswordResetEmail(email, token);

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send reset email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    console.error('Forgot password API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
