import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </AuthProvider>
  );
};

export default App;
