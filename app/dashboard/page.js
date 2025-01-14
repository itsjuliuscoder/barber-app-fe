"use client";
import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getAllSales, getAllInventories, getAllUsers } from '@/services/api';
import { accounting } from 'accounting';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Tab } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isWithinInterval } from 'date-fns';

export default function Dashboard() {

  const [salesData, setSalesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [pageLoader, setPageLoader] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
 
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

  const filteredSalesData = salesData.filter(sale => {
    const saleDate = new Date(sale.dateEnrolled);
    return isWithinInterval(saleDate, { start: startDate, end: endDate });
  });

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


  const salesChartData = {
    labels: filteredSalesData.map(sale => format(new Date(sale.dateEnrolled), 'MM/dd/yyyy')),
    datasets: [
      {
        label: 'Total Amount',
        data: filteredSalesData.map(sale => sale.payments.reduce((total, payment) => total + payment.amount, 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Commission Made',
        data: filteredSalesData.map(sale => sale.commission),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Statistics',
      },
    },
  };

  const inventoryChartData = {
    labels: inventories.map(inventory => inventory.itemName),
    datasets: [
      {
        label: 'Inventory Count',
        data: inventories.map(inventory => inventory.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const inventoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inventory Statistics',
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" }  />
      <div className="flex flex-1">
        <Sidebar data={userData} />
        <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
          {userData && userData.category === 'Admin' ? (
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
          ) : (
            <div className="grid grid-cols-2 gap-6 mb-6 text-black">
              <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
                <span className="text-4xl mb-2">₦</span>
                <h3 className="text-4xl font-semibold mb-2">{salesData.length > 0 ? accounting.format(salesData.filter(sale => sale.user._id === userData._id).reduce((total, sale) => total + sale.payments.reduce((sum, payment) => sum + payment.amount, 0), 0)) : '....'}</h3>
                <p className="text-[16px]">Total Amount Made</p>
              </div>
              <div className="bg-gray-100 p-6 shadow-md rounded-lg text-left">
                <FaBox className="text-4xl mb-2" />
                <h3 className="text-4xl font-semibold mb-2">{salesData.length}</h3>
                <p className="text-[16px]">Total Sales</p>
              </div>
            </div>
          )}
          <div className="flex gap-6 w-full">
            <div className="flex-grow bg-gray-100 p-6 shadow-md rounded-lg basis-3/5">
              {userData && userData.category === 'Admin' ? (
                  <Tab.Group>
                  <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                          selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }`
                      }
                    >
                      Statistics
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                          selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }`
                      }
                    >
                      Sales Table
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                  <Tab.Panel className="bg-gray-100 p-6 shadow-md rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Sales Statistics</h2>
                  <div className="flex space-x-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                    <Bar data={salesChartData} options={salesChartOptions} />
                  </Tab.Panel>
                    <Tab.Panel className="bg-gray-100 p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Sales Table</h2>
                        <div className="flex space-x-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        {filteredSalesData.length > 0 ? (
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
                              {filteredSalesData.map((sale, index) => (
                                <tr key={sale._id}>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">{index + 1}</td>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">{sale.customerName ? sale.customerName : sale.payments.map(payment => payment.customerName).join(', ')}</td>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">₦{sale.payments.reduce((total, payment) => total + payment.amount, 0)}</td>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">{sale.user.email}</td>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">₦{sale.commission}</td>
                                  <td className="py-2 px-4 border-b border-gray-200 text-left">{new Date(sale.dateEnrolled).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>No Sales Data for this Range Date</p>
                        )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Sales</h2>
                  {salesData.length > 0 ? (
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Sale ID</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Customer</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Total Amount</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Commission Made</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesData.filter(sale => sale.user._id === userData._id).map((sale, index) => (
                          <tr key={sale._id}>
                            <td className="py-2 px-4 border-b border-gray-200 text-left">{index + 1}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-left">{(sale.payments.map(payment => payment.customerName).join(', '))}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-left">₦{accounting.format(sale.payments.reduce((total, payment) => total + payment.amount, 0))}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-left">₦{accounting.format(sale.commission)}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-left">{new Date(sale.dateEnrolled).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500 mb-4">You have not created any sales yet.</p>
                      <button 
                        onClick={() => router.push('/add-sale')} 
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add New Sale
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-grow-0 flex-shrink-0 basis-2/5">
              <div className="bg-gray-100 p-6 shadow-md rounded-lg mt-3">
                {/* Content for the second column */}
                <h2 className="text-xl font-semibold mb-4">Inventory Statistics</h2>
                {/* <p>This is the content for the second column, which takes up 30% of the width.</p> */}
                <Doughnut data={inventoryChartData} options={inventoryChartOptions} />
              </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg mt-3"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}