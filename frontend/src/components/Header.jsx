import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-black hover:bg-[#F5F5F5] rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-black tracking-tight">FoodGuard AI</h1>
          <p className="text-xs text-[#666666]">AI Food Safety Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden md:flex items-center bg-[#F5F5F5] px-3 py-1.5 rounded-full border border-[#E5E5E5]">
          <span className="w-2 h-2 rounded-full bg-black mr-2 animate-pulse"></span>
          <span className="text-xs font-semibold text-black tracking-wide">LOCAL DEMO • NO ACCOUNT REQUIRED</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-[#666666] hover:text-black hover:bg-[#F5F5F5] rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-[#666666] hover:text-black hover:bg-[#F5F5F5] rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
