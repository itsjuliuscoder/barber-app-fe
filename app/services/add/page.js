"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Footer from '../../../components/Shared/Footer';
import { FaUserTie, FaSpinner } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { addService } from '@/services/api'; // Assuming you have an API function to Add Inventory
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddServices() {
    const [userData, setUserData] = useState(null);
    const [pageLoader, setPageLoader] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const user = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(user);
        if(user && userDetails) {
            setUserData(userDetails);
        } else {
            router.push('/')
        }

        // Set a timeout to hide the loader after 10 seconds
        const timer = setTimeout(() => {
            setPageLoader(false);
        }, 2000);

        // Cleanup the timer
        return () => clearTimeout(timer);

    }, [router]);

const [formData, setFormData] = useState({
    title: '',
    price: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here
    const addNewService = async () => {
        try {
            const response = await addService(formData);
            console.log("Add Service Response ---> ", response);
            // if (response.status === 201) {
                toast.success('New Service added successfully!');
                setFormData({
                    title: '',
                    price: '',
                });
                setTimeout(() => {
                    router.push('/services');
                }, 3000);
            //} 
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred. Please try again.');
            console.log('Error adding Service:', error);
        }   
    }

    addNewService();
};

if (pageLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 mx-auto"></div>
        <h2 className="text-xl font-semibold">Loading...</h2>
        <p className="text-gray-500">Please wait while the page loads.</p>
      </div>
      </div>
    );
}

return (
    <div className="flex flex-col h-screen">
        <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
        <ToastContainer />
        <div className="flex flex-1">
        <Sidebar data={userData} />
            <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
                <div className="bg-gray-100 p-6 shadow-md rounded-lg h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Add New Service</h2>
                    </div>
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Service Title</label>
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Service Price</label>
                            <input 
                                type="text" 
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <button 
                                type="submit" 
                                className={`w-full py-2 px-4 mt-6 font-semibold rounded-md shadow-md ${!formData.title || !formData.price ? 'bg-gray-300 text-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                disabled={!formData.title || !formData.price}
                            >
                                <span>Add New Item</span> {loading && <FaSpinner className="animate-spin inline ml-2" />}
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