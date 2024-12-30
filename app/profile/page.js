"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";


export default function Profile() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const user = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(user);
    if(user && userDetails) {
        setUserData(userDetails);
    } else {
        router.push('/')
    }
  }, [router]);
  
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

return (
    <div className="flex flex-col h-screen">
        <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
                        {userData ? (
                            <div>
                                <p><strong>Name:</strong> {userData.fullName}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Phone:</strong> {userData.phone}</p>
                                {/* Add more profile details as needed */}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={userData ? userData.fullName : ''}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={userData ? userData.email : ''}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={userData ? userData.phone : ''}
                                />
                            </div>
                            {/* Add more form fields as needed */}
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
}