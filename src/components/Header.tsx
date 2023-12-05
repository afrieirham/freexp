import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header>
      <div className="hidden mx-auto text-gray-500 sm:flex sm:items-center sm:justify-center max-w-7xl navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.ico" className="w-12 h-12" />
            <span className="font-bold text-gray-500 normal-case">
              FreeXP.dev
            </span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="px-1 text-xs menu menu-horizontal">
            <li>
              <a href="https://myprs.xyz/" target="_blank">
                Show your PRs – MyPRs.xyz
              </a>
            </li>
            <li>
              <a href="https://www.ossjobs.dev/" target="_blank">
                Open Source Jobs
              </a>
            </li>
            <li>
              <a href="https://www.opensourcealternative.to/" target="_blank">
                Open Source Alternatives
              </a>
            </li>
          </ul>
          <a
            target="_blank"
            href="https://github.com/afrieirham/freexp-db"
            className="text-xs normal-case btn btn-sm btn-block btn-outline btn-railway sm:w-auto"
          >
            Add Project
          </a>
        </div>
      </div>

      <div className="sm:hidden drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="m-4 drawer-content">
          <label htmlFor="my-drawer" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <div className="z-20 drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="h-full gap-2 p-4 w-80 menu bg-base-200 text-base-content">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/favicon.ico" className="w-12 h-12" />
              <span className="font-bold text-gray-500 normal-case">
                FreeXP.dev
              </span>
            </Link>
            <li>
              <a href="https://myprs.xyz/" target="_blank">
                Show your PRs – MyPRs.xyz
              </a>
            </li>
            <li>
              <a href="https://www.ossjobs.dev/" target="_blank">
                Open Source Jobs
              </a>
            </li>
            <li>
              <a href="https://www.opensourcealternative.to/" target="_blank">
                Open Source Alternatives
              </a>
            </li>
            <a
              target="_blank"
              href="https://github.com/afrieirham/freexp-db"
              className="mt-2 text-xs normal-case btn btn-sm btn-outline btn-railway"
            >
              Add Project
            </a>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
