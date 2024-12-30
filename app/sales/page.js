"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getAllSales } from '@/services/api';



export default function SalesList() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(user);
    if(user && userDetails) {
        setUserData(userDetails);
    } else {
        router.push('/')
    }

    const fetchSalesData = async () => {
      try {
        const response = await getAllSales();
        console.log("Sales data ---> ", response);
        setSalesData(response.sales);
      } catch (error) {
        console.log("Error fetching sales data:", error);
      }
    };

    fetchSalesData();

    // Set a timeout to hide the loader after 10 seconds
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);

  }, [router]);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handlePrintReceipt = (sale) => {
    const printContent = `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Barber Shop Receipt</h2>
        <p class="mb-2"><strong>Customer:</strong> ${sale.payments.map(payment => payment.customerName).join(', ')}</p>
        <div class="mb-2">
          <strong>Services Rendered:</strong>
          <ul class="list-disc list-inside">
            ${sale.payments.map(payment => `<li>${payment.service} - ₦${payment.amount}</li>`).join('')}
          </ul>
        </div>
        <p class="mb-2"><strong>Total Amount:</strong> ₦${sale.payments.reduce((total, payment) => total + payment.amount, 0)}</p>
        <p class="mb-2"><strong>Sales Date:</strong> ${new Date(sale.dateEnrolled).toLocaleDateString()}</p>
      </div>
    `;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Receipt</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
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
      <div className="flex flex-1">
      <Sidebar data={userData} />
        <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)]">
          <div className="bg-gray-100 p-6 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-black">All Sales Made</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                    Add New Sales
                </button>
            </div>
            <table className="min-w-full bg-white text-black">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Sales ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Customer Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Service</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Total Amount</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Staff</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Commission</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={sale._id}>
                    <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{sale.payments.map(payment => payment.customerName).join(', ')}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{sale.payments.map(payment => payment.service).join(', ')}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{sale.payments.reduce((total, payment) => total + payment.amount, 0)}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{sale.user.fullName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{sale.commission}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{new Date(sale.dateEnrolled).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <div className="relative inline-block text-left">
                        <button
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          onClick={() => toggleDropdown(sale._id)}
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
                        {openDropdown === sale._id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button
                              onClick={() => handlePrintReceipt(sale)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Print Receipt
                            </button>
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