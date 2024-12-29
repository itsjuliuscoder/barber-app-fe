"use client";
import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";

export default function Dashboard() {

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

  

  return (
    <div className="flex flex-col h-screen">
      <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" }  />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
          <div className="grid grid-cols-3 gap-6 mb-6 text-black">
            <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left text-black">
              <FaUserTie className="text-4xl mb-2" />
              <h3 className="text-4xl font-semibold mb-2 text-black">50</h3>
              <p className="text-[16px]">Total Barbers Enrolled</p>
            </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
              <FaDollarSign className="text-4xl mb-2" />
              <h3 className="text-4xl font-semibold mb-2">$120,000</h3>
              <p className="text-[16px]">Total Amount Made</p>
            </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
              <FaBox className="text-4xl mb-2" />
              <h3 className="text-4xl font-semibold mb-2">200</h3>
              <p className="text-[16px]">Total Inventory Items</p>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex-grow bg-gray-100 p-6 shadow-md rounded-lg basis-3/5">
              {/* Content for the first column */}
              <h2 className="text-2xl font-semibold mb-4">List of Sales</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Sale ID</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Customer</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Barber</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, customer: 'John Doe', amount: '$200', date: '2023-01-01', barber: 'Barber A' },
                    { id: 2, customer: 'Jane Smith', amount: '$150', date: '2023-01-02', barber: 'Barber B' },
                    { id: 3, customer: 'Sam Johnson', amount: '$300', date: '2023-01-03', barber: 'Barber C' },
                    { id: 4, customer: 'Chris Lee', amount: '$250', date: '2023-01-04', barber: 'Barber D' },
                    { id: 5, customer: 'Patricia Brown', amount: '$100', date: '2023-01-05', barber: 'Barber E' },
                    { id: 6, customer: 'Michael Davis', amount: '$400', date: '2023-01-06', barber: 'Barber F' },
                    { id: 7, customer: 'Linda Wilson', amount: '$350', date: '2023-01-07', barber: 'Barber G' },
                    { id: 8, customer: 'Robert Martinez', amount: '$500', date: '2023-01-08', barber: 'Barber H' },
                    { id: 9, customer: 'Mary Anderson', amount: '$450', date: '2023-01-09', barber: 'Barber I' },
                    { id: 10, customer: 'James Taylor', amount: '$600', date: '2023-01-10', barber: 'Barber J' },
                  ].map((sale) => (
                    <tr key={sale.id}>
                      <td className="py-2 px-4 border-b border-gray-200">{sale.id}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{sale.customer}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{sale.amount}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{sale.barber}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{sale.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex-grow-0 flex-shrink-0 basis-2/5">
              <div className="bg-gray-100 p-6 shadow-md rounded-lg">
                {/* Content for the second column */}
                <h2 className="text-xl font-semibold mb-4">Sales Statistics</h2>
                <p>This is the content for the second column, which takes up 40% of the width.</p>
              </div>
              <div className="bg-gray-100 p-6 shadow-md rounded-lg mt-3">
                {/* Content for the second column */}
                <h2 className="text-xl font-semibold mb-4">Inventory Statistics</h2>
                <p>This is the content for the second column, which takes up 40% of the width.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}