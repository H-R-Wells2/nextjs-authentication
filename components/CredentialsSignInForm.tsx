"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { credentialsSignIn } from "@/actions/auth";
import Link from "next/link";

export default function CredentialsSignInForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await credentialsSignIn(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Signed in successfully!");
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
          type="email"
          name="email"
          required
          placeholder="Email"
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          disabled={loading}
          autoComplete="none"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary hover:bg-[#13aa95] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-secondary hover:text-[#13aa95] font-medium"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
