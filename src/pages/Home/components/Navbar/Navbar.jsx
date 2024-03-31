import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[100%]">
      <nav
        class="border-gray-200 bg-gray-50 w-max h-max  rounded-md"
        onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-hamburger"
          aria-expanded="false">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </nav>
      <div className="w-[300px] h-[90%] relative">
        <div
          className={`w-[100%] h-[100%] rounded-lg shadow-stone-700 bg-slate-50 border mt-3 p-5 transition-all absolute ${
            isSidebarOpen ? 'left-0' : 'left-[-400px]'
          }`}>
          <div
            className=" font-sans text-md cursor-pointer w-[100%] px-2 py-1 rounded-md hover:bg-slate-300"
            onClick={() => navigate('/invoices')}>
            Invoice
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
