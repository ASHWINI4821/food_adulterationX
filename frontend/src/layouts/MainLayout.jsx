import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden font-sans text-black">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col lg:pl-64 h-full transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F5F5F5] p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5] p-4 text-center text-xs text-[#666666]">
          <p>FoodGuard AI is a screening and decision-support system. It does not replace certified laboratory testing, professional toxicological assessment, or regulatory authorities.</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
