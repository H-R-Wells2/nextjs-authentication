import SignOutButton from "@/components/SignOutButton";
import CredentialsSignUpForm from "@/components/CredentialsSignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] flex items-center justify-center px-4 sm:pt-20 relative">
      <div className="absolute top-0 right-0 pr-3 pt-3">
        <SignOutButton />
      </div>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4 text-black">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Create your HRWells account
        </h2>
        <CredentialsSignUpForm />
      </div>
    </div>
  );
}
