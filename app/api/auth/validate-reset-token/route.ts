import { NextRequest, NextResponse } from 'next/server';
import { validateResetToken } from '@/lib/password-reset';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const result = await validateResetToken(token);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Validate reset token API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}