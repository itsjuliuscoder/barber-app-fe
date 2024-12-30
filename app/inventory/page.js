"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getAllInventories } from '@/services/api';



export default function InventoryList() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [inventories, setInventories] = useState([]);

  const router = useRouter();
  
  useEffect(() => {
    const user = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(user);
    if(user && userDetails) {
        setUserData(userDetails);
    } else {
        router.push('/')
    }

    const fetchInventoriesData = async () => {
      try {
        const response = await getAllInventories();
        //console.log("Inventories data ---> ", response);
        setInventories(response.inventory);
      } catch (error) {
        console.log("Error fetching sales data:", error);
      }
    };

    fetchInventoriesData();

  }, [router]);
  
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

return (
    <div className="flex flex-col h-screen">
        <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
        <div className="flex flex-1">
        <Sidebar data={userData} />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="bg-gray-100 p-6 shadow-md rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">All Inventory Items</h2>
                            <button onClick={() => setOpenModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                    Add New Inventory
                            </button>
                    </div>
                    {openModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span className="hidden sm:inline-block sm:align-top sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3 className="text-lg leading-6 text-gray-900 font-bold">Add New Inventory</h3>
                                  <div className="mt-[22px]">
                                    <form>
                                      <div className="mb-4 w-full">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
                                          Item Name
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item" type="text" placeholder="Item Name" />
                                      </div>
                                      <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serialNo">
                                          Serial No
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="serialNo" type="text" placeholder="Serial No" />
                                      </div>
                                      <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                          Category
                                        </label>
                                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
                                          <option value="For Sale">For Sale</option>
                                          <option value="For Use">For Use</option>
                                        </select>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                                Add
                              </button>
                              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setOpenModal(false)}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <table className="min-w-full bg-white text-black">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Item ID</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Item Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Serial No</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Category</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventories.map((inventory, index) => (
                                <tr key={inventory._id}>
                                    <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{inventory.itemName}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{inventory.serialNo}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{inventory.category}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(inventory.addItemDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <div className="relative inline-block text-left">
                                            <button
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                                onClick={() => toggleDropdown(inventory._id)}
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
                                            {openDropdown === inventory._id && (
                                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        { inventory.category && inventory.category == "For Sale" ? (<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Finally Sold</a>)
                                                        : (<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Finished Using</a>)}
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
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