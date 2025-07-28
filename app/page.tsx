import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] py-12 flex flex-col items-center justify-center px-4 sm:pt-20 relative">
      <div className="absolute top-0 right-0 pr-3 pt-3">
        <SignOutButton />
      </div>
      <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-white text-black shadow-xl min-w-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          Welcome to HRWells Community
        </h2>

        <div className="w-full border-b border-slate-400" />

        <div className="flex w-full gap-3 items-center">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "profile"}
              width={96}
              height={96}
              className="w-[4.5rem] h-[4.5rem] rounded-full shadow shadow-black border-4 border-slate-200"
            />
          ) : (
            <FaUser className="w-[4.5rem] h-[4.5rem] p-2 rounded-full shadow shadow-black border-4 border-slate-200 text-gray-800" />
          )}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">
              {session?.user?.name}
            </h3>
            <h3 className="text-base  text-gray-700">{session?.user?.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
