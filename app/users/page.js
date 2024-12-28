"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const users = [
  { id: 1, name: 'John Doe', experience: '5 years', specialty: 'Haircuts', commission: '20%' },
  { id: 2, name: 'Jane Smith', experience: '3 years', specialty: 'Shaves', commission: '40%' },
  { id: 3, name: 'Mike Johnson', experience: '7 years', specialty: 'Coloring', commission: '30%' },
  { id: 4, name: 'Emily Davis', experience: '2 years', specialty: 'Styling', commission: '25%' },
  // Add more users as needed
];

export default function UserList() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
          <div className="bg-gray-100 p-6 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">List of Enrolled Users</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                    Add New User
                </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">User ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Experience</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Specialty</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Commission</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.experience}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.specialty}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.commission}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <div className="relative inline-block text-left">
                        <button
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          onClick={() => toggleDropdown(user.id)}
                        >
                          Actions
                          <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {openDropdown === user.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Disable</a>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}