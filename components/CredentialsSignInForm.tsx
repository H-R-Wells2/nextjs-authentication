"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CredentialsSignInForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    toast.success("Signed in successfully");

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="border rounded-xl px-4 py-2 text-sm"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="border rounded-xl px-4 py-2 text-sm"
      />
      <button
        disabled={loading}
        className="bg-secondary hover:bg-[#13aa95] w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors cursor-pointer"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
