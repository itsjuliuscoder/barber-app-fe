"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Footer from '../../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { addNewUser } from '@/services/api';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddUser() {
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
  
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [commission, setCommission] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            fullName: event.target.elements[0].value,
            email: event.target.elements[1].value,
            category: event.target.elements[2].value,
            specialty: event.target.elements[3].value,
            commission: event.target.elements[4].value,
            isActive: true,
            password: 'password123' // Default password for new users
        };
        console.log(formData);
        // Add form submission logic here
        const addUser = async () => {
            try {
                const response = await addNewUser(formData);
                console.log("User added successfully:", response);
                toast.success('User added successfully');
                setTimeout(() => {
                    router.push('/users');
                }, 10000);
            } catch (error) {
                console.log("Error adding user:", error);
                toast.error('An error occurred while adding the user');
            }
        }

        addUser();
    };

return (
    <div className="flex flex-col h-screen">
        <ToastContainer />
        <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
        <div className="flex flex-1">
            <Sidebar data={userData} />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="bg-gray-100 p-6 shadow-md rounded-lg h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Add New User</h2>
                    </div>
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                       
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select Service</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                {/* Add more category as needed */}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Specialty</label>
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select Specialty</option>
                                <option value="Haircut">Haircut</option>
                                <option value="Shave">Shave</option>
                                <option value="Coloring">Coloring</option>
                                <option value="Styling">Styling</option>
                                <option value="None">None</option>
                                {/* Add more services as needed */}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Commission</label>
                            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="w-1/4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
                                Add User
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