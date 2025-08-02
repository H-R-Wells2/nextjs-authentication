"use client";

import useAuthStore from "@/store/authStore";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
  const { data: session } = useSession();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const handleLogOut = async () => {
    await toast.promise(
      signOut({ callbackUrl:"/sign-in" }),
      {
        loading: "Signing out...",
        success: "Logged out successfully!",
        error: "Logout failed. Please try again.",
      }
    );
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (session?.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session, setIsLoggedIn]);

  return (
    <div className="">
      {isLoggedIn ? (
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-100 transition-colors rounded-lg px-3 py-1.5 font-medium text-slate-700 bg-white cursor-pointer shadow-md"
        >
          <FiLogOut className="w-5 h-5 text-slate-500" />
          Sign Out
        </button>
      ) : (
        <Link
          href={"/sign-in"}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-100 transition-colors rounded-lg px-3 py-1.5 font-medium text-slate-700 bg-white cursor-pointer shadow-md"
        >
          <FiLogIn className="w-5 h-5 text-slate-500" />
          Sign In
        </Link>
      )}
    </div>
  );
}
