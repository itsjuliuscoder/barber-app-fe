"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import AuthService from '@/utils/auth';
import { login } from '@/services/api';
import { FaArrowRight } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      console.log("Login response ---> ", data);
      localStorage.setItem('userDetails', JSON.stringify(data));
      localStorage.setItem('authToken', data.token);
      setMessage(data.statusMessage);

      if (data.statusCode === 200) {
        router.push("/dashboard");
      }
    } catch (err) {
      setErrorMessage("Login failed --> " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageColumn}>
        <Image src="/bg-2.jpg" alt="Background" layout="fill" objectFit="cover" priority />
      </div>
      <div className={styles.formColumn}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h2 className="text-2xl font-bold">Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-700"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
          {errorMessage && <p className="error font-bold text-red-800">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;