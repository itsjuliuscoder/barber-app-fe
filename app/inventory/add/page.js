"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Footer from '../../../components/Shared/Footer';
import { FaUserTie, FaDolla } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { addNewInventory } from '@/services/api'; // Assuming you have an API function to Add Inventory
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    serialNo: '',
    status: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here
    const addInventory = async () => {
        try {
            const response = await addNewInventory(formData);
            console.log("Add Inventory Response ---> ", response);
            // if (response.status === 201) {
                toast.success('Inventory added successfully!');
                setFormData({
                    itemName: '',
                    category: '',
                    serialNo: '',
                    status: ''
                });
                setTimeout(() => {
                    router.push('/inventory');
                }, 3000);
            //} 
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.log('Error adding inventory:', error);
        }   
    }

    addInventory();
};

return (
    <div className="flex flex-col h-screen">
        <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
        <ToastContainer />
        <div className="flex flex-1">
        <Sidebar data={userData} />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="bg-gray-100 p-6 shadow-md rounded-lg h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Add New Inventory</h2>
                    </div>
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input 
                                type="text" 
                                name="itemName"
                                value={formData.itemName}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Category</option>
                                <option value="For Sale">For Sale</option>
                                <option value="For Use">For Use</option>
                                {/* Add more services as needed */}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Serial No</label>
                            <input 
                                type="text" 
                                name="serialNo"
                                value={formData.serialNo}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <input 
                                type="text" 
                                name="status"
                                placeholder="In Use || Used || Sold || Not Used || Not Sold"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            />
                        </div>
                        <div className="col-span-1">
                            <button type="submit" className="w-full py-2 px-4 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
                                Add Inventory
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