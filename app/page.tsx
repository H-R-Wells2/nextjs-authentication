import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] py-12 flex flex-col items-center justify-center px-4 sm:pt-20 relative">
      <div className="absolute top-0 right-0 pr-3 pt-3">
        <SignOutButton />
      </div>
      <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-white text-black shadow-xl max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome to HRWells
        </h2>

        <div className="w-full border-b border-slate-400" />

        <div className="flex w-full gap-5 items-center">
          <Image src={session?.user?.image || ""} alt={session?.user?.image || "profile"} width={96} height={96} className="w-20 h-20 rounded-full shadow border-2 border-white" />
          <div className="flex flex-col">

          <h3 className="text-lg font-semibold text-gray-800">{session?.user?.name}</h3>
          <h3 className="text-lg  text-gray-700">{session?.user?.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
