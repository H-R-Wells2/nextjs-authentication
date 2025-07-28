import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/verification';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (result.success && result.email) {
      // Send welcome email after successful verification
      try {
        const user = await import('@/prisma').then(async ({ prisma }) => {
          return prisma.user.findUnique({
            where: { email: result.email },
            select: { name: true, email: true }
          });
        });

        if (user?.name && user?.email) {
          await sendWelcomeEmail(user.email, user.name);
        }
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the verification if welcome email fails
      }

      return NextResponse.json({
        success: true,
        message: 'Email verified successfully'
      });
    }

    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  } catch (error) {
    console.error('Email verification API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}