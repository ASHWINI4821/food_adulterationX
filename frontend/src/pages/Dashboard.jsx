import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowRight, Activity, AlertTriangle, ShieldAlert, Clock } from 'lucide-react';
import { storageService } from '../services/storageService';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, adulterated: 0, highRisk: 0, pending: 0 });
  const [recentSamples, setRecentSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for realistic UX
    setTimeout(() => {
      setStats(storageService.getDashboardStats());
      const allSamples = storageService.getSamples();
      setRecentSamples(allSamples.slice(0, 5));
      setIsLoading(false);
    }, 600);
  }, []);

  // Mock data for charts
  const trendData = [
    { name: 'Jan', samples: 45, adulterated: 4 },
    { name: 'Feb', samples: 52, adulterated: 5 },
    { name: 'Mar', samples: 38, adulterated: 2 },
    { name: 'Apr', samples: 65, adulterated: 7 },
    { name: 'May', samples: 48, adulterated: 3 },
    { name: 'Jun', samples: 70, adulterated: 9 },
  ];

  const adulterantData = [
    { name: 'Starch', count: 24 },
    { name: 'Artificial Colour', count: 35 },
    { name: 'Excess Water', count: 18 },
    { name: 'Synthetic Sweetener', count: 12 },
    { name: 'Other', count: 8 },
  ];

  const distributionData = [
    { name: 'Milk', value: 30 },
    { name: 'Spices', value: 25 },
    { name: 'Honey', value: 15 },
    { name: 'Oil', value: 10 },
    { name: 'Tea', value: 8 },
    { name: 'Other', value: 12 },
  ];

  const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#E5E5E5'];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#E5E5E5] border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-[#666666] text-sm">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Food Safety Intelligence</h1>
          <p className="text-[#666666] text-sm mt-1">Screen food samples, identify suspected adulteration, and understand food-safety risks.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/history" className="px-4 py-2 border border-[#E5E5E5] bg-white text-black text-sm font-medium rounded-lg hover:bg-[#F5F5F5] transition-colors">
            View History
          </Link>
          <Link to="/analyze" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors">
            + Analyze Food Sample
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Samples', value: stats.total, icon: <Activity size={20} />, subtext: '+12% from last month' },
          { label: 'Adulterated', value: stats.adulterated, icon: <AlertTriangle size={20} />, subtext: 'Based on screening' },
          { label: 'High Risk', value: stats.highRisk, icon: <ShieldAlert size={20} />, subtext: 'Require confirmation' },
          { label: 'Pending Review', value: stats.pending, icon: <Clock size={20} />, subtext: 'Awaiting lab results' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between mb-3 text-[#666666]">
              <span className="text-sm font-medium">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
            <div className="text-xs text-[#666666]">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
          <h3 className="text-sm font-bold text-black mb-6">Adulteration Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
                <XAxis dataKey="name" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="samples" stroke="#999999" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Total Samples" />
                <Line type="monotone" dataKey="adulterated" stroke="#000000" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Adulterated" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
          <h3 className="text-sm font-bold text-black mb-6">Food Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E5E5' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Common Adulterants & Recent Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
          <h3 className="text-sm font-bold text-black mb-6">Common Adulterants</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adulterantData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" horizontal={false} />
                <XAxis type="number" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip cursor={{fill: '#F5F5F5'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E5E5' }}/>
                <Bar dataKey="count" fill="#000000" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Samples Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#E5E5E5] flex justify-between items-center">
            <h3 className="text-sm font-bold text-black">Recent Samples</h3>
            <Link to="/history" className="text-xs font-medium text-[#666666] hover:text-black flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F5F5] text-[#666666] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-medium">Sample ID</th>
                  <th className="px-5 py-3 font-medium">Food</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {recentSamples.map((sample) => (
                  <tr key={sample.id} className="hover:bg-[#F9F9F9] transition-colors">
                    <td className="px-5 py-4 font-medium text-black">{sample.id}</td>
                    <td className="px-5 py-4 text-[#666666]">{sample.food}</td>
                    <td className="px-5 py-4 text-[#666666]">{sample.testDate}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        sample.risk === 'HIGH' ? 'bg-black text-white' :
                        sample.risk === 'MODERATE' ? 'bg-[#E5E5E5] text-black border border-[#CCCCCC]' :
                        sample.risk === 'LOW' ? 'bg-white text-[#666666] border border-[#E5E5E5]' :
                        'bg-[#F5F5F5] text-[#666666]'
                      }`}>
                        {sample.risk}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link to={`/result/${sample.id}`} className="text-black text-xs font-medium hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {recentSamples.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-[#666666]">
                      No samples found. Upload a report to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
