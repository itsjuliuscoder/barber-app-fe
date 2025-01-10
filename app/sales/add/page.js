"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Footer from '../../../components/Shared/Footer';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { addSales } from '@/services/api'; // Assuming you have an API function to add sales
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSales() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [payments, setPayments] = useState([{ customerName: '', amount: '', service: '' }]);
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

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handlePaymentChange = (index, event) => {
    const { name, value } = event.target;
    const newPayments = [...payments];
    newPayments[index][name] = value;
    setPayments(newPayments);
  };

  const handleAddPayment = () => {
    setPayments([...payments, { customerName: '', amount: '', service: '' }]);
  };

  const handleRemovePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const payload = {
      payments,
      user: userData._id,
      commission: userData.commission, // Assuming a fixed commission for simplicity
    };

    console.log('Form Data:', payload);

    try {
        await addSales(payload);
        toast.success('Sales added successfully');
        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
      console.log('Error adding sales:', error);
      toast.error('Failed to add sales');
    }
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
            <h2 className="text-2xl font-semibold">Add New Sales</h2>
          </div>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-2 grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                type="text"
                name="customerName"
                value={payments[0].customerName}
                onChange={(e) => handlePaymentChange(0, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
                />
              </div>
            </div>
            {payments.map((payment, index) => (
              <div key={index} className="col-span-2 grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select
                  name="service"
                  value={payment.service}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  >
                  <option value="">Select Service</option>
                  <option value="Haircut">Haircut</option>
                  <option value="Shave">Shave</option>
                  <option value="Coloring">Coloring</option>
                  <option value="Styling">Styling</option>
                  {/* Add more services as needed */}
                  </select>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                  type="number"
                  name="amount"
                  value={payment.amount}
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  />
                </div>
              <div className="col-span-3 flex justify-end">
                {payments.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePayment(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
                )}
              </div>
              </div>
            ))}
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleAddPayment}
                className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none flex items-center"
              >
              Add Payment <FaPlus className="ml-2" />
              </button>
            </div>
            <div className="col-span-2 flex justify-end mt-4">
              <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
              <span>Submit </span> {loading && <FaSpinner className="animate-spin inline ml-2" />}
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