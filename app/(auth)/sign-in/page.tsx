import { login } from "@/actions/auth";
import CredentialsSignInForm from "@/components/CredentialsSignInForm";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  // Redirect if user is already signed in
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] py-12 flex flex-col items-center justify-center px-4 sm:pt-20 relative">
      <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-white text-black shadow-xl max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome to HRWells
        </h2>

        <CredentialsSignInForm />

        {/* Divider */}
        <div className="w-full flex items-center gap-4">
          <hr className="flex-1 border-slate-300" />
          <span className="text-slate-500 text-sm">or</span>
          <hr className="flex-1 border-slate-300" />
        </div>

        {/* Login with Google Button */}
        <form className="w-full flex"
          action={async () => {
            "use server";
            await login("google");
          }}
        >
          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-100 transition-colors rounded-xl px-4 py-2 font-medium text-slate-700 bg-white cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;