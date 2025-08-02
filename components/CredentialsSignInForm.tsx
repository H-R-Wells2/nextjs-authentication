"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { credentialsSignIn } from "@/actions/auth";
import Link from "next/link";

export default function CredentialsSignInForm() {
  const [loading, setLoading] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await credentialsSignIn(formData);

    if (result?.error) {
      if (result.needsVerification && result.email) {
        setUnverifiedEmail(result.email);
        setShowResendVerification(true);
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.error(result.error);
        setLoading(false);
      }
    } else {
      toast.success("Signed in successfully!");
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 800);
    }
  }

  async function handleResendVerification() {
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: unverifiedEmail }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Verification email sent! Please check your inbox.");
        setShowResendVerification(false);
      } else {
        toast.error(result.error || "Failed to resend verification email");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  }

  return (
    <div className="w-full space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className="w-full flex flex-col gap-3"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-transparent"
          disabled={loading}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-sec hover:bg-[#13aa95] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-start text-[0.85rem] -mt-1 text-slate-600">
          <Link
            href="/forgot-password"
            className="text-sec hover:text-[#13aa95] font-normal"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      {showResendVerification && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 mb-3">
            Your email address is not verified. Please check your email for a
            verification link.
          </p>
          <button
            onClick={handleResendVerification}
            className="text-sm w-full cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            Resend Verification Email
          </button>
        </div>
      )}

      <div className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-sec hover:text-[#13aa95] font-semibold"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
