"use client";
import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getAllSales, getAllInventories, getAllUsers } from '@/services/api';
import { accounting } from 'accounting';

export default function Dashboard() {

  const [salesData, setSalesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [pageLoader, setPageLoader] = useState(true);
 
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
    const fetchSalesData = async () => {
      try {
        const response = await getAllSales();
        // console.log("Sales data ---> ", response);
        setSalesData(response.sales);
        setTotalAmount(response.totalAmount);
      } catch (error) {
        console.log("Error fetching sales data:", error);
      }
    };

    const fetchInventoriesData = async () => {
      try {
        const response = await getAllInventories();
        // console.log("Inventories data ---> ", response);
        setInventories(response.inventory);
        setTotalInventory(response.count);
      } catch (error) {
        console.log("Error fetching sales data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Users:", response);
        setUsers(response.users);
        setTotalUsers(response.count);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }


    fetchUsers();
    fetchInventoriesData();
    fetchSalesData();

    // Set a timeout to hide the loader after 10 seconds
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);

  }, [router], []);

  

  if (!userData || userData.category !== 'Admin') {
    return null; // or you can redirect to another page
  }

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
      <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" }  />
      <div className="flex flex-1">
        <Sidebar data={userData} />
          <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
            {userData && userData.category === 'Admin' && (
              <div className="grid grid-cols-3 gap-6 mb-6 text-black">
              <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left text-black">
                <FaUserTie className="text-4xl mb-2" />
                <h3 className="text-4xl font-semibold mb-2 text-black">{totalUsers}</h3>
                <p className="text-[16px]">Total Users Enrolled</p>
              </div>
              <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
                <span className="text-4xl mb-2">₦</span>
                <h3 className="text-4xl font-semibold mb-2">{totalAmount ? accounting.format(totalAmount) : '....'}</h3>
                <p className="text-[16px]">Total Amount Made</p>
              </div>
              <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
                  <FaBox className="text-4xl mb-2" />
                  <h3 className="text-4xl font-semibold mb-2">{totalInventory ? totalInventory : "..."}</h3>
                  <p className="text-[16px]">Total Inventory Items</p>
              </div>
            </div>
             )}
          <div className="flex gap-6 w-full">
            <div className="flex-grow bg-gray-100 p-6 shadow-md rounded-lg basis-3/5">
              {/* Content for the first column */}
              <h2 className="text-2xl font-semibold mb-4">List of Sales</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Sale ID</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Customer</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Total Amount</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Staff Details</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Commission Made</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={sale._id}>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">{index + 1}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">{(sale.payments.map(payment => payment.customerName).join(', '))}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">₦{accounting.format(sale.payments.reduce((total, payment) => total + payment.amount, 0))}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">{sale.user.fullName}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">₦{accounting.format(sale.commission)}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-left">{new Date(sale.dateEnrolled).toLocaleDateString()}</td>
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