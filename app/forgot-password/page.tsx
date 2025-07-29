"use client";

import { useState } from "react";
import { FaArrowLeft, FaMailBulk } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setEmail(email);
        setEmailSent(true);
        toast.success("Password reset email sent!");
      } else {
        toast.error(result.error || "Failed to send reset email");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <FaMailBulk className="w-16 h-16 text-[#13aa95] mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Check Your Email
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            If you don&apos;t see the email, check your spam folder or try
            again.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setEmailSent(false)}
              className="flex justify-center w-full bg-secondary hover:bg-[#13aa95] text-white font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Send Another Email
            </button>
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
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-[#13aa95] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?
            <Link
              href="/sign-in"
              className="text-secondary hover:text-[#13aa95] font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
