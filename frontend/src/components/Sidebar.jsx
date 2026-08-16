import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TestTube, 
  FileUp, 
  History, 
  Database, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Info,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Analyze Food', path: '/analyze', icon: <TestTube size={20} /> },
    { name: 'Upload Report', path: '/upload', icon: <FileUp size={20} /> },
    { name: 'Sample History', path: '/history', icon: <History size={20} /> },
    { name: 'Foods', path: '/foods', icon: <Database size={20} /> },
    { name: 'Adulterants', path: '/adulterants', icon: <AlertTriangle size={20} /> },
    { name: 'Regulations', path: '/regulations', icon: <ShieldCheck size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'How It Works', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-[#E5E5E5] z-50 transition-transform duration-300 ease-in-out flex flex-col w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E5E5]">
          <Link to="/" className="flex flex-col" onClick={() => {if(window.innerWidth < 1024) toggleSidebar()}}>
            <span className="font-bold text-xl tracking-tight text-black">FOODGUARD AI</span>
            <span className="text-xs text-[#666666] font-medium tracking-wider">FOOD SAFETY INTELLIGENCE</span>
          </Link>
          <button className="lg:hidden text-black" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {if(window.innerWidth < 1024) toggleSidebar()}}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-black text-white' 
                  : 'text-[#666666] hover:bg-[#F5F5F5] hover:text-black'
                }
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Status */}
        <div className="p-4 border-t border-[#E5E5E5]">
          <div className="bg-[#F5F5F5] rounded-lg p-3 text-center border border-[#E5E5E5]">
            <div className="text-xs font-bold text-black mb-1">DEMO MODE</div>
            <div className="text-[10px] text-[#666666]">Local data only</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
