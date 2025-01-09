import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AuthProvider from './components/AuthProvider/AuthProvider';


const App = () => {

  return (
    <AuthProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
};

export default App
