import { SpeedInsights } from "@vercel/speed-insights/next";
import { BiLogoGithub } from "react-icons/bi";


export default function Footer() {
    return (
      <footer>
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-y-4 px-2 py-6 text-zinc-800 dark:text-zinc-300">
          <small className="duration-200 hover:text-white font-mono justify-between items-center flex">
            &copy;&nbsp;{new Date().getFullYear()}, Some Fancy-named Website Project. All rights reserved.
          </small>
  
          <div className="hover:text-white duration-200 justify-between flex items-center">
            <a
              href="https://github.com/anirbanbasu/website-anirbanbasu"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BiLogoGithub title="GitHub repository" aria-label="GitHub repository" />
            </a>
          </div>
        </div>
        <SpeedInsights />
      </footer>
    );
  }