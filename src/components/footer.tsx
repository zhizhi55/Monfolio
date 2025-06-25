import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2a133e] to-[#1a102b] py-4 text-center text-purple-200">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
        <span className="text-lg font-bold tracking-widest sm:text-xl">
          Gmonad!
        </span>
        <Link
          href="https://x.com/intent/follow?screen_name=SawadaTataro88"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded bg-purple-700/30 px-3 py-1 text-sm font-semibold text-purple-300 transition-colors hover:bg-purple-700 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-current"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">Follow me</span>
        </Link>
      </div>
    </footer>
  );
}
