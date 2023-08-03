import React from "react";

function Header() {
  return (
    <header>
      <div className="hidden mx-auto text-gray-500 sm:flex max-w-7xl navbar bg-base-100">
        <div className="flex-1">
          <a className="flex items-center gap-2">
            <img src="/favicon.ico" className="w-12 h-12" />
            <span className="font-bold text-gray-500 normal-case">
              FreeXP.dev
            </span>
          </a>
        </div>
        <div className="flex-none">
          <ul className="px-1 menu menu-horizontal">
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
        </div>
      </div>

      <div className="flex navbar bg-base-100 sm:hidden">
        <div className="navbar-start">
          <div className="dropdown ">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
