"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { credentialsSignUp } from "@/actions/auth";
import Link from "next/link";

export default function CredentialsSignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await credentialsSignUp(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Account created successfully!");
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
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          disabled={loading}
          autoComplete="none"

        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          disabled={loading}
          autoComplete="none"

        />
        <input
          type="password"
          name="password"
          placeholder="Password (min. 8 characters)"
          required
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          disabled={loading}
        />
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
          className="bg-secondary hover:bg-[#13aa95] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-secondary hover:text-[#13aa95] font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
