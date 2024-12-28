"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Footer from '../../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const sales = [
    { id: 1, customer: 'John Doe', service: 'Haircut', amount: '$20', date: '2023-10-01' },
    { id: 2, customer: 'Jane Smith', service: 'Shave', amount: '$15', date: '2023-10-02' },
    { id: 3, customer: 'Mike Johnson', service: 'Coloring', amount: '$50', date: '2023-10-03' },
    { id: 4, customer: 'Emily Davis', service: 'Styling', amount: '$30', date: '2023-10-04' },
    // Add more sales as needed
];

export default function AddInventory() {
    const [openDropdown, setOpenDropdown] = useState(null);
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

const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
};

return (
    <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="bg-gray-100 p-6 shadow-md rounded-lg h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Add New Inventory</h2>
                    </div>
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select Category</option>
                                <option value="Coloring">For Sale</option>
                                <option value="Styling">For Use</option>
                                {/* Add more services as needed */}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Serial No</label>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-1">
                            <button type="submit" className="w-full py-2 px-4 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
                                Add Sale
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
}