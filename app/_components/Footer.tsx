import { fetchProfile } from "@/sanity/client";
import { Profile } from "@/types/Profile";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";


export default async function Footer() {
    const profile:Profile = await fetchProfile()

    return (
      <footer className=" dark:bg-slate-400 bg-slate-100">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-y-4 px-2 py-6 text-zinc-800 dark:text-zinc-100">
          <small>
            &copy;&nbsp;{new Date().getFullYear()}, {profile?.name.givenNames.join(' ').concat(' ', profile?.name.familyName)}. All rights reserved.
          </small>
  
          <small><a href="https://github.com/typedfolio" target="_blank" rel="noreferrer noopener" className="flex items-center justify-center">
              <span>Made with&nbsp;</span><Image src="./typedfolio-logo.svg" className="bg-red-200" alt="Typedfolio project" width={125} height={25} />
            </a></small>
        </div>
        <SpeedInsights />
      </footer>
    );
  }