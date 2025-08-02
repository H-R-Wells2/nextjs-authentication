"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { credentialsSignUp } from "@/actions/auth";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CredentialsSignUpForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await credentialsSignUp(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success(result.message || "Account created successfully!", {
        duration: 7000,
      });
      setTimeout(() => {
        router.push("/");
      }, 800);
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
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-transparent"
          disabled={loading}
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-transparent"
          disabled={loading}
          autoComplete="off"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password (min. 8 characters)"
            required
            className="flex w-full justify-center items-center border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-transparent"
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
        <div className="text-xs text-slate-500 space-y-1">
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
          className="bg-sec hover:bg-[#13aa95] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-sec hover:text-[#13aa95] font-semibold"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
