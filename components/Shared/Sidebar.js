"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaBox, FaDollarSign, FaUser } from 'react-icons/fa';

export default function Sidebar({ data }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="bg-gray-800 text-white w-64 p-4">
      <div className="space-y-4 font-[family-name:var(--font-geist-poppins)]">
        <Link href="/dashboard" legacyBehavior>
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </a>
        </Link>
        <div>
          <button
            onClick={() => toggleSection('inventory')}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded w-full text-left"
          >
            <FaBox />
            <span>Inventory</span>
          </button>
          {openSection === 'inventory' && (
            <div className="ml-6 mt-2 space-y-2">
              <Link href="/inventory/add" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">Add Inventory</a>
              </Link>
              <Link href="/inventory" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">List Inventory</a>
              </Link>
              {/* <Link href="/inventory/view" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">View Inventory Details</a>
              </Link> */}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection('sales')}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded w-full text-left"
          >
            <FaDollarSign />
            <span>Sales</span>
          </button>
          {openSection === 'sales' && (
            <div className="ml-6 mt-2 space-y-2">
              <Link href="/sales/add" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">Add Sales</a>
              </Link>
              <Link href="/sales" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">All Sales</a>
              </Link>
              {/* <Link href="/sales/view" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">View Sales Details</a>
              </Link> */}
            </div>
          )}
        </div>
        <div>

          {data && data.category === 'Admin' && (
              <button
              onClick={() => toggleSection('users')}
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <FaUser />
              <span>Users</span>
            </button>
          )}

          {openSection === 'users' && (
            <div className="ml-6 mt-2 space-y-2">
              <Link href="/users/add" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">Add User</a>
              </Link>
              <Link href="/users" legacyBehavior>
                <a className="block hover:bg-gray-700 p-2 rounded">All Users</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}