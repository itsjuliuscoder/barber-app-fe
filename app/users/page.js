"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Sidebar from '../../components/Shared/Sidebar';
import Footer from '../../components/Shared/Footer';
import { FaUserTie, FaDollarSign, FaBox } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { getAllUsers, addNewUser } from "@/services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserList() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
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

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Users:", response);
        setUsers(response.users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }

    fetchUsers();

    // Set a timeout to hide the loader after 10 seconds
    const timer = setTimeout(() => {
      setPageLoader(false);
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);

  }, [router], []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

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
            setOpenModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.log("Error adding user:", error);
            toast.error('An error occurred while adding the user');
        }
    }

      addUser();
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
      <ToastContainer />
      <Navbar data={userData && userData.fullName ? (userData.fullName) : "John Doe" } />
      <div className="flex flex-1">
      <Sidebar data={userData} />
        <div className="flex-1 p-6 font-[family-name:var(--font-geist-poppins)] text-black">
          <div className="bg-gray-100 p-6 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">List of Enrolled Users</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none" onClick={() => setOpenModal(true)}>
                    Add New User
                </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">User ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Full Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Email Address</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Category</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Specialty</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Commission</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-left">{index + 1}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.fullName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.category}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.specialty}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.commission}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <div className="relative inline-block text-left">
                        <button
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          onClick={() => toggleDropdown(user._id)}
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
                        {openDropdown === user._id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Disable</a>
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
          
          {openModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
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
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="commission">
                      Commission
                    </label>
                    <input
                      type="text"
                      id="commission"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>
      </div>
      <Footer />
    </div>
  );
}