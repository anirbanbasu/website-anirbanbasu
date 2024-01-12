import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
      <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" priority src="/logo.svg" width={220} height={50} alt="logo" />
          </Link>
          <nav>
            <ul className="flex items-center gap-x-8">
              <li>
                <Link
                  href="#"
                  className="hover:text-purple-400 duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-purple-400 duration-300"
                >
                  Projects
                </Link>
              </li>
              <li>Other menu item(s)...</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }