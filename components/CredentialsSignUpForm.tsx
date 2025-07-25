"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CredentialsSignUpForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    toast.success("Account created successfully");

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="border rounded-xl px-4 py-2 text-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border rounded-xl px-4 py-2 text-sm"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border rounded-xl px-4 py-2 text-sm"
      />
      <button
        disabled={loading}
        className="bg-secondary hover:bg-[#13aa95] w-full rounded-xl px-4 py-2 text-white font-semibold transition-colors cursor-pointer"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
