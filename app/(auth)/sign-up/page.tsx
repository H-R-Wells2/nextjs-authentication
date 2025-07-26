import CredentialsSignUpForm from "@/components/CredentialsSignUpForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  // Redirect if user is already signed in
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4 sm:pt-20 relative">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4 text-black">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Create your HRWells account
        </h2>
        <CredentialsSignUpForm />
      </div>
    </div>
  );
}