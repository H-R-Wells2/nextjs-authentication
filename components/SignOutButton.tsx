import { logout } from "@/actions/auth";
import { auth } from "@/auth";
import Link from "next/link";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default async function SignOutButton() {
  const session = await auth();

  return (
    <div className="">
      {session ? (
        <form
          action={async () => {
            "use server";

            await logout();
          }}
        >
          <button className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-100 transition-colors rounded-xl px-3 py-1.5 font-medium text-slate-700 bg-white cursor-pointer">
            <FiLogOut className="w-5 h-5 text-slate-500" />
            Sign Out
          </button>
        </form>
      ) : (
        <Link
          href={"/sign-in"}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-100 transition-colors rounded-xl px-3 py-1.5 font-medium text-slate-700 bg-white cursor-pointer"
        >
          <FiLogIn className="w-5 h-5 text-slate-500" />
          Sign In
        </Link>
      )}
    </div>
  );
}
