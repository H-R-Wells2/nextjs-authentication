import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-slate-100 py-12 flex flex-col items-center justify-center px-4 sm:pt-20 relative">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-sec">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block rounded bg-sec px-6 py-3 text-white text-sm font-medium shadow hover:bg-[#13aa95] focus:outline-none focus:ring-2 focus:ring-sec"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
