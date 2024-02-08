'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { PiListBullets } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";

export const routes = [
  {
    title: "Home",
    subtitle: "The summary page",
    href: "/",
  },
/*  {
    title: "Publications",
    subtitle: "Communicated research",
    href: "#",
  },
  {
    title: "Teaching",
    subtitle: "Teaching and training",
    href: "#",
  },*/
  {
    title: "Projects",
    subtitle: "Things I'm working on",
    href: "/projects",
  },
/*  {
    title: "et cetera",
    subtitle: "and so forth...",
    href: "#",
  },*/
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <header>
        <nav className="w-full bg-neutral opacity-95 align-middle fixed top-0 left-0 right-0 z-[100]">
          <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <Link href="/">
                  <Image className="relative" priority width={220} height={50} src="/logo.svg" alt="logo" />
                </Link>
                <div className="md:hidden">
                  <button className="p-2 rounded-md outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? ( <IoCloseOutline title="Close menu" aria-label="Close menu" size={25} /> ) : ( <PiListBullets title="Open navigation menu" aria-label="Open navigation menu" size={25} /> )}
                  </button>
                </div>
              </div>
            <div className="max-h-screen overflow-y-scroll md:overflow-hidden">
              <div className={`flex-1 justify-between items-center align-middle pb-3 md:block md:pb-0 ${isMenuOpen ? 'px-12 py-6 md:p-0 block' : 'hidden'}`}>
                <ul className="h-screen md:h-auto text-base items-center justify-center md:flex">
                  {routes.map((route, index) => {
                    const { title, subtitle, href } = route;
                    return (
                      <li key={index} className="p-3 md:py-5 text-left border-b-[1px] border-accent md:border-b-0 md:hover:border-b-2">
                        <Link className="font-bold text-xl md:font-normal md:text-base hover:text-accent transition-all" href={href} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                          {title}
                          <div className="md:hidden font-light text-base">{subtitle}</div>
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