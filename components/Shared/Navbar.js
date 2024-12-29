"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    router.push('/');
  };


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold font-[family-name:var(--font-geist-poppins)]">
          <Link href="/" legacyBehavior>
            <a>Barber App</a>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none w-1/2"
          />
        </div>
        <div className="flex items-center space-x-4 font-[family-name:var(--font-geist-poppins)]">
          <FaBell className="w-6 h-6 cursor-pointer" />
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span>{data ? data : 'John Doe'}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <Link href="/profile" legacyBehavior>
                  <a className="block px-4 py-2 hover:bg-gray-200">Profile</a>
                </Link>
                <Link href="/settings" legacyBehavior>
                  <a className="block px-4 py-2 hover:bg-gray-200">Settings</a>
                </Link>
                <a
                  onClick={() => handleLogout()}
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;