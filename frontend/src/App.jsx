import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Placeholder imports for pages
import Dashboard from './pages/Dashboard';
import AnalyzeFood from './pages/AnalyzeFood';
import UploadReport from './pages/UploadReport';
import SampleHistory from './pages/SampleHistory';
import Foods from './pages/Foods';
import Adulterants from './pages/Adulterants';
import Regulations from './pages/Regulations';
import Reports from './pages/Reports';
import About from './pages/About';
import AnalysisResult from './pages/AnalysisResult';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analyze" element={<AnalyzeFood />} />
        <Route path="upload" element={<UploadReport />} />
        <Route path="history" element={<SampleHistory />} />
        <Route path="foods" element={<Foods />} />
        <Route path="adulterants" element={<Adulterants />} />
        <Route path="regulations" element={<Regulations />} />
        <Route path="reports" element={<Reports />} />
        <Route path="about" element={<About />} />
        <Route path="result/:id" element={<AnalysisResult />} />
      </Route>
    </Routes>
  );
};

export default App;
