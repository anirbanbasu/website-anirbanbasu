import { fetchProfile, socialLinkIcon } from "@/sanity/client";
import { Profile } from "@/types/Profile";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";


export default async function Footer() {
    const profile:Profile = await fetchProfile()

    return (
      <footer className="bg-base-200 w-full">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-y-4 px-2 py-6">
          <span className="flex flex-wrap items-center justify-between">
            {profile.socialLinks && profile.socialLinks.map((item, index) => {
                  const Icon = socialLinkIcon(item.socialLinkType)
                  if (item.socialLinkType !== 'other') {
                    return (
                        <Link key={index} href={item.linkURL} title={item.caption} aria-label={item.caption} target="_blank" rel="noreferrer noopener">
                          <Icon className="text-info mx-2 w-5 h-5 hover:text-error"/>
                        </Link>
                    )
                  }
                })}
          </span>
          <span className="text-xs">
            &copy;&nbsp;{new Date().getFullYear()}, {profile?.name.givenNames.join(' ').concat(' ', profile?.name.familyName)}.
          </span>
          <span>
            <a href="https://github.com/typedfolio" target="_blank" rel="noreferrer noopener" className="flex items-center justify-center">
              <Image src="./typedfolio-logo.svg" className="bg-accent" alt="Typedfolio project" width={100} height={20} />
            </a>
          </span>
          <div>
            <label className="cursor-pointer grid place-items-center" aria-label="Theme controller pointer">
              <input type="checkbox" value="aqua" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" aria-label="Theme controller"/>
                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
          </div>
        </div>
        <SpeedInsights />
      </footer>
    );
  }