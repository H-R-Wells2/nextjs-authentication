import { NextRequest, NextResponse } from 'next/server';
import { resendVerificationEmail } from '@/actions/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await resendVerificationEmail(email);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    }

    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  } catch (error) {
    console.error('Resend verification API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}