import { BiLogoGithub } from "react-icons/bi";

export default function Footer() {
    return (
      <footer className="border-t border-zinc-800 mt-4">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-6 text-zinc-400">
          <small className="duration-200 font-mono">
            &copy; {new Date().getFullYear()}, Some Fancy-named Website Project. All rights reserved.
          </small>
  
          <div className="hover:text-white duration-200">
            <a
              href="https://github.com/anirbanbasu/website-anirbanbasu"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BiLogoGithub />
            </a>
          </div>
        </div>
      </footer>
    );
  }