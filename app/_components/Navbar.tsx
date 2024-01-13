'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { PiListBullets } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";

export const routes = [
  {
    title: "Home",
    subtitle: "The summary page",
    href: "#",
  },
  {
    title: "Publications",
    subtitle: "Communicated research",
    href: "#",
  },
  {
    title: "Teaching",
    subtitle: "Teaching and training",
    href: "#",
  },
  {
    title: "Projects",
    subtitle: "Things I'm working on",
    href: "#",
  },
  {
    title: "et cetera",
    subtitle: "and so forth...",
    href: "#",
  },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <header>
        <nav className="w-full bg-gray-100 align-middle fixed top-0 left-0 right-0 z-[100]">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <Image className="relative dark:invert" priority width={220} height={50} src="/logo.svg" alt="logo" />
              </Link>
              <div className="md:hidden">
                <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? ( <IoCloseOutline size={25} /> ) : ( <PiListBullets size={25} /> )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={`flex-1 justify-between items-center align-middle pb-3 mt-8 md:block md:pb-0 md:mt-0 ${isMenuOpen ? 'p-12 md:p-0 block' : 'hidden'}`}>
              <ul className="h-screen md:h-auto font-sans text-base items-center justify-center md:flex">
                {routes.map((route, index) => {
                  const { title, subtitle, href } = route;
                  return (
                    <li key={index} className="p-3 md:py-5 text-left border-b-2 border-gray-700 md:border-b-0">
                      <Link className=" hover:text-neutral-400 transition-all" href={href} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {title}
                        <div className="md:hidden text-xs">{subtitle}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </header>
    );
  }