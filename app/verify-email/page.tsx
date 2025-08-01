"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa"; // Importing icons from react-icons
import Link from "next/link";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    verifyEmail(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed to verify email');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong during verification');
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {status === 'loading' && (
          <>
            <FaSpinner className="w-16 h-16 text-sec mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Your Email
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-4">
              You will be redirected to the sign-in page in a few seconds...
            </p>
            <Link
              href="/sign-in"
              className="flex justify-center w-full bg-sec hover:bg-[#13aa95] text-white font-semibold py-2 px-6 rounded-xl transition-colors"
            >
              Sign In Now
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <FaTimesCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link
                href="/sign-up"
                className="flex justify-center w-full bg-sec hover:bg-[#13aa95] text-white font-semibold py-2 px-4 rounded-xl transition-colors"
              >
                Create New Account
              </Link>
              <Link
                href="/sign-in"
                className="flex justify-center w-full border border-slate-300 hover:bg-slate-100 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
