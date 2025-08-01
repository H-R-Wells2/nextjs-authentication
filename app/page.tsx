import { HeroSectionOne } from "@/components/HeroSectionOne";

export default async function Home() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#d8e9fe] to-[#62a4fa] py-12 flex flex-col items-center justify-center px-4 md:px-8 sm:pt-20 relative">
      <HeroSectionOne />
    </div>
  );
}
