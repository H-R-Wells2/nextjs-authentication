"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      console.log("No Token");
      setTokenValid(false);
      return;
    }

    // Validate token on component mount
    validateToken(token);
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch("/api/validate-reset-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      setTokenValid(result.success);
    } catch (error) {
      console.log(error);
      setTokenValid(false);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        toast.success("Password reset successfully!");
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      } else {
        toast.error(result.error || "Failed to reset password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13aa95] mx-auto mb-4"></div>
          <p className="text-gray-600">Validating reset token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <FaTimesCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Invalid Link
          </h1>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <div className="space-y-3">
            <Link
              href="/forgot-password"
              className="block w-full bg-sec hover:bg-[#13aa95] text-white font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Request New Link
            </Link>
            <Link
              href="/sign-in"
              className="block w-full border border-slate-300 hover:bg-slate-100 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Password Reset Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Your password has been reset. You will be redirected to the sign-in
            page shortly.
          </p>
          <Link
            href="/sign-in"
            className="inline-block bg-sec hover:bg-[#13aa95] text-white font-semibold py-2 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <div className="mb-6">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="New Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#13aa95] focus:border-transparent"
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm New Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#13aa95] focus:border-transparent"
              disabled={loading}
            />
            <span
            //   type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </span>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sec hover:bg-[#13aa95] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
